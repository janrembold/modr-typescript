///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.loaderconfig.ts"/>
var Modr;
(function (Modr) {
    var Core;
    (function (Core) {
        var Loader = (function () {
            function Loader() {
            }
            /**
             * Helper function to load all plugins with given jQuery selector
             * @param selector 	default is data attribute "[data-modr]"
             */
            Loader.initPlugins = function (selector) {
                if (selector === void 0) { selector = '[data-modr]'; }
                $(selector).each(function () {
                    Modr.Core.Loader.initPlugin($(this));
                });
            };
            /**
             * Init plugin by single jQuery element
             * @param $element 	The jQuery element to initialize
             * @returns {JQueryPromise<{}>|boolean}	 The corresponding jQuery promise or false if nothing was loaded
             */
            Loader.initPlugin = function ($element) {
                // init with required resources array
                var config = {
                    resources: $element.data('resources')
                };
                // add optional modr configuration
                if ($element.data('modr')) {
                    config.modr = $element.data('modr');
                }
                // add optional plugin init function
                if ($element.data('init')) {
                    var init = eval($element.attr('data-init'));
                    if ($.isFunction(init)) {
                        config.init = init;
                    }
                }
                // add optional plugin test function
                if ($element.data('test')) {
                    var test = eval($element.attr('data-test'));
                    if ($.isFunction(test)) {
                        config.test = test;
                    }
                }
                // add optional options
                if ($element.data('options')) {
                    config.options = $element.data('options');
                }
                // conditionally load plugins and styles
                return Modr.Core.Loader.load(config, $element);
            };
            /**
             * Load all files defined in configuration object
             * @param config	The Modr loader config object
             * @param $element	The jQuery element
             * @returns {JQueryPromise<{}>|boolean}  The corresponding jQuery promise or false if nothing was loaded
             */
            Loader.load = function (config, $element) {
                var deferreds = [];
                // check optional test function
                if ($.isFunction(config.test) && !config.test()) {
                    return false;
                }
                // check all resources
                for (var i = 0, resLen = config.resources.length; i < resLen; ++i) {
                    var resource = config.resources[i];
                    // collect all paths
                    for (var j = 0, pathLen = resource.paths.length; j < pathLen; ++j) {
                        var path = resource.paths[j];
                        // check optional base path override
                        var base = resource.hasOwnProperty('base') ? resource.base : Modr.Core.Loader.base;
                        base = Modr.Core.Loader._replaceBaseMaps(base);
                        // build url
                        var url = Modr.Core.Loader._joinPath(base, path);
                        // check cache first
                        if (Modr.Core.Loader._cache.hasOwnProperty(url)) {
                            deferreds.push(Modr.Core.Loader._cache[url]);
                            continue;
                        }
                        // choose loader by file type
                        var promise = void 0;
                        if (url.indexOf('.css', url.length - 4) !== -1) {
                            promise = Modr.Core.Loader._loadStylesheet(url);
                        }
                        else if (url.indexOf('.js', url.length - 3) !== -1) {
                            promise = Modr.Core.Loader._loadJavaScript(url);
                        }
                        else {
                            throw 'Unknown file format: ' + url;
                        }
                        // add promise to cache
                        if (promise) {
                            Modr.Core.Loader._cache[url] = promise;
                            deferreds.push(promise);
                        }
                    }
                }
                // check possible empty deferred array
                if (deferreds.length === 0) {
                    return false;
                }
                return $.when.apply($, deferreds).done(function () {
                    // extend and init modr plugins
                    if ($.isArray(config.modr)) {
                        for (var i = 0, len = config.modr.length; i < len; ++i) {
                            var name_1 = config.modr[i].name;
                            var module = config.modr[i].module;
                            if (Modr[name_1] && Modr[name_1][module]) {
                                // instantiate modr plugin and init boilerplate
                                var myInstance = new Modr[name_1][module]($element, config.options);
                                myInstance.init();
                            }
                        }
                    }
                    // call init function
                    if ($.isFunction(config.init)) {
                        config.init($element);
                    }
                });
            };
            /**
             * Conditionally load JavaScript file
             * @param url  The URL to load
             * @param cache  Use caching
             * @returns {JQueryXHR}  The jQuery promise for the loaded file
             * @private
             */
            Loader._loadJavaScript = function (url, cache) {
                if (cache === void 0) { cache = true; }
                return $.ajax({
                    url: url,
                    dataType: 'script',
                    cache: cache
                });
            };
            /**
             * Conditionally load Stylesheet file
             * @param url  The URL to load
             * @param cache  Use caching
             * @returns {JQueryXHR}  The jQuery promise for the loaded file
             * @private
             */
            Loader._loadStylesheet = function (url, cache) {
                if (cache === void 0) { cache = true; }
                return $.ajax({
                    url: url,
                    dataType: 'text',
                    cache: cache,
                    success: function () {
                        $('<link>', {
                            rel: 'stylesheet',
                            type: 'text/css',
                            'href': url
                        }).appendTo('head');
                    }
                });
            };
            /**
             * Helper to join paths preventing double or missing slashes
             * @param prefix	The first part of the path
             * @param postfix	The second part of the path, mostly the file name
             * @returns {string}	The joined or full path
             * @private
             */
            Loader._joinPath = function (prefix, postfix) {
                var prefixLength = prefix.length;
                var postfixLength = postfix.length;
                var prefixHasSeparator = prefixLength > 0 ? (prefix[prefixLength - 1] === '/') : false;
                var postfixHasSeparator = postfixLength > 0 ? (postfix[0] === '/') : false;
                var separator = '';
                if (prefixLength > 0 && postfixLength > 0) {
                    if (!prefixHasSeparator && !postfixHasSeparator) {
                        separator = '/';
                    }
                    else if (prefixHasSeparator && postfixHasSeparator) {
                        prefix = prefix.slice(0, -1);
                    }
                }
                return prefix + separator + postfix;
            };
            /**
             * Search & replace for all given base mappings
             * @param base	The base map to replace mappings
             * @returns {string}	The replaced path
             * @private
             */
            Loader._replaceBaseMaps = function (base) {
                for (var search in Modr.Core.Loader.baseMap) {
                    if (Modr.Core.Loader.baseMap.hasOwnProperty(search)) {
                        var replace = Modr.Core.Loader.baseMap[search];
                        base = base.replace(new RegExp(search, 'g'), replace);
                    }
                }
                return base;
            };
            /**
             * Base path - default for all given files
             * @type {string}
             */
            Loader.base = '';
            /**
             * Object of base path mappings
             * @type {{}}
             */
            Loader.baseMap = {};
            /**
             * Cache object. Property is full path to JS/CSS file. Value is its JQuery Promise.
             * @type {{}}
             * @private
             */
            Loader._cache = {};
            return Loader;
        }());
        Core.Loader = Loader;
    })(Core = Modr.Core || (Modr.Core = {}));
})(Modr || (Modr = {}));
