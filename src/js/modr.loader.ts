///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.loaderconfig.ts"/>

namespace Modr {
    export class Loader {
        
        public static base: string = '';
        public static _cache: Object = {};

        public static initPlugins(selector:string = '[data-modr]') : void {

            $(selector).each(function () {
                Modr.Loader.initPlugin($(this));
            });
        }

        public static initPlugin($element : JQuery) : JQuery {

            let config: Modr.Interface.LoaderConfig = {
                resources: $element.data('resources')
            };

            // add modr configuration
            if($element.data('modr')) {
                config.modr = $element.data('modr');
            }

            // add optional plugin init
            if($element.data('init')) {
                let init = eval($element.attr('data-init'));
                if($.isFunction(init)) {
                    config.init = init;
                }
            }

            // add optional plugin test
            if($element.data('test')) {
                let test = eval($element.attr('data-test'));
                if($.isFunction(test)) {
                    config.test = test;
                }
            }

            // add optional options
            if($element.data('options')) {
                config.options = $element.data('options');
            }

            // conditionally load plugins and styles
            Modr.Loader.load(config, $element);

            return $element;
        }

        public static load(config : Modr.Interface.LoaderConfig, $element?: JQuery) : JQueryPromise<{}> | boolean {
            let deferreds = [];

            // check optional test function
            if($.isFunction(config.test) && !config.test()) {
                return false;
            }

            for(let i=0, len=config.resources.length; i<len; ++i) {
                let resource = config.resources[i];

                // collect all paths
                for(let j=0, len2=resource.paths.length; j<len2; ++j) {
                    let path = resource.paths[j];

                    // check optional base path override
                    let url = resource.hasOwnProperty('base') ? resource.base : Modr.Loader.base;
                    url += path;

                    // check cache first
                    if(Modr.Loader._cache.hasOwnProperty(url)) {
                        deferreds.push(Modr.Loader._cache[url]);
                        continue;
                    }

                    // choose loader by file type
                    let promise;
                    if(url.indexOf('.css', url.length-4) !== -1) {
                        promise = Modr.Loader._loadStylesheet(url);

                    } else if(url.indexOf('.js', url.length-3) !== -1) {
                        promise = Modr.Loader._loadJavaScript(url);

                    } else {
                        throw 'Unknown file format: ' + url;
                    }

                    // add promise to cache
                    if(promise) {
                        Modr.Loader._cache[url] = promise;
                        deferreds.push(promise);
                    }
                }
            }

            // check possible empty deferred array
            if(deferreds.length === 0) {
                return false;
            }

            return $.when.apply($, deferreds).done(function() {
                // extend and init modr plugins
                if($.isArray(config.modr)) {
                    for(let i=0, len=config.modr.length; i<len; ++i) {
                        let name = config.modr[i].name;
                        let module = config.modr[i].module;

                        if(Modr[name] && Modr[name][module]) {

                            // inject jquery boilerplate defaults
                            $.extend(Modr[name][module].prototype, {
                                _$el: $element,
                                __modrExtend: function () {
                                    // extend defaults with component options
                                    this._options = $.extend({}, this._options, config.options);
                                    return this;
                                }
                            });

                            // instantiate modr plugin and init/extend boilerplate
                            let myInstance = new Modr[name][module]($element, {});
                            myInstance.__modrExtend().init();
                        }
                    }
                }

                // call init function
                if($.isFunction(config.init)) {
                    config.init($element);
                }
            });
        }

        public static _loadJavaScript(url : string, cache : boolean = true) : JQueryPromise<{}> {
            return $.ajax({
                url: url,
                dataType: 'script',
                cache: cache
            });
        }

        public static _loadStylesheet(url : string, cache : boolean = true) : JQueryPromise<{}> {
            // return $.ajax({
            //     url: url,
            //     dataType: 'text',
            //     cache: cache,
            //     success: function(css) {
            //         $('<style/>')
            //             .html(css)
            //             .appendTo('head');
            //     }
            // });

            return $.ajax({
                url: url,
                dataType: 'text',
                cache: cache,
                success: function() {
                    $('<link>', {
                        rel: 'stylesheet',
                        type: 'text/css',
                        'href': url
                    }).appendTo('head');
                }
            });
        }
    }
}
