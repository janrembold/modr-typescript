///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.loaderconfig.ts"/>

namespace Modr.Helper {
    export class Loader {

        public static base: string = '';
        public static _cache: Object = {};

        public static initPlugins(selector:string = '[data-modr]') : void {

            $(selector).each(function () {
                Modr.Helper.Loader.initPlugin($(this));
            });
        }

        public static initPlugin($element : JQuery) : void {

            let config: Modr.Interface.LoaderConfig;

            // check configuration type: modr or custom plugin
            if($element.data('resources')) {

                // load legacy plugin
                config = Modr.Helper.Loader.prepareLegacyConfig($element);
            }
            else if($element.data('name') && $element.data('mod')) {

                // load modr plugin
                config = Modr.Helper.Loader.prepareModrConfig($element);
            }
            else {

                throw 'Unknown plugin format';
            }

            // conditionally load plugins and styles
            Modr.Helper.Loader.load(config);
        }

        public static load(config : Modr.Interface.LoaderConfig) : JQueryPromise<{}> | boolean {

            console.log('load config', config);

            // check optional test
            if(config.hasOwnProperty('test') && !config['test']()) {
                return false;
            }

            let deferreds = [];

            for(let i=0, len=config.paths.length; i<len; ++i) {

                let url = config.paths[i];

                // check cache first
                if(Modr.Helper.Loader._cache.hasOwnProperty(url)) {
                    deferreds.push(Modr.Helper.Loader._cache[url]);
                    continue;
                }

                // choose loader by file type
                let promise;
                if(url.indexOf('.css', url.length-4) != -1) {
                    promise = Modr.Helper.Loader._loadStylesheet(url);

                } else if(url.indexOf('.js', url.length-3) != -1) {
                    promise = Modr.Helper.Loader._loadJavaScript(url);

                } else {
                    throw 'Unknown file format: ' + url;
                }

                // add promise to cache
                if(promise) {
                    Modr.Helper.Loader._cache[url] = promise;
                    deferreds.push(promise);
                }
            }

            return $.when.apply($, deferreds).done(function() {
                console.log('Promises done');
                if($.isFunction(config.init)) {
                    config.init();
                }
            });
        }

        public static prepareLegacyConfig($element : JQuery) : Modr.Interface.LoaderConfig {

            let config : Modr.Interface.LoaderConfig = { paths: [] };
            let resources = $element.data('resources');
            // TODO Add some error handling for incorrect formatted Array

            // collect all necessary files
            for(let i=0, len=resources.length; i<len; ++i) {
                for(let j=0, len2=resources[i].paths.length; j<len2; ++j) {

                    // set base path
                    let url = typeof(resources[i].base) !== 'undefined' ? resources[i].base : Modr.Helper.Loader.base;

                    // add url to path
                    url += resources[i].paths[j];

                    // collect all URLs to load
                    config.paths.push(url);
                }
            }

            // add init function
            if($element.data('init')) {
                let init = eval($element.attr('data-init'));
                config.init = function() {
                    init($element);
                }
            }

            return config;
        }

        public static prepareModrConfig($element : JQuery): Modr.Interface.LoaderConfig {

            let config : Modr.Interface.LoaderConfig = { paths: [] };
            let name = $element.data('name');
            let mod = $element.data('mod');
            let options = $element.data('options') || {};

            // set base path
            let url = $element.data('base') ? $element.data('base') : Modr.Helper.Loader.base;

            // add url to path
            url += 'modr.' + name.toLowerCase() + '.' + mod.toLowerCase() + '.js';

            // add base plugin
            config.paths.push(url);

            // add optional options object
            if($element.data('options')) {
                config.options = $element.data('options');
                // TODO Add some error handling for incorrect formatted JSON
            }

            // add optional test function
            if($element.data('test')) {
                config.test = eval($element.attr('data-test'));
            }

            // add init function
            config.init = function() {
                if(Modr[name] && Modr[name][mod]) {

                    // inject jquery boilerplate defaults
                    $.extend(Modr[name][mod].prototype, {
                        _$el: $element,
                        __modrExtend: function () {
                            // extend defaults with component options
                            this._options = $.extend({}, this._options, options);
                            return this;
                        }
                    });

                    // instantiate modr plugin and init/extend boilerplate
                    let myInstance = new Modr[name][mod]($element, options);
                    myInstance.__modrExtend().init();
                }
            };

            return config;
        }

        public static _loadJavaScript(url : string, cache : boolean = true) : JQueryPromise<{}> {

            return $.ajax({
                url: url,
                dataType: 'script',
                cache: cache,
                success: function() {
                    console.log('JS wurde geladen: ' + url);
                }
            });
        }

        public static _loadStylesheet(url : string, cache : boolean = true) : JQueryPromise<{}> {

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
                    console.log('CSS wurde geladen: ' + url);
                }
            });
        }
    }
}
