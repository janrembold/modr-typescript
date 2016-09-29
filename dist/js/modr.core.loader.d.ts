/// <reference path="../declaration/jquery.d.ts" />
/// <reference path="modr.interface.loaderconfig.d.ts" />
declare namespace Modr.Core {
    class Loader {
        /**
         * Base path - default for all given files
         * @type {string}
         */
        static base: string;
        /**
         * Object of base path mappings
         * @type {{}}
         */
        static baseMap: Object;
        /**
         * Cache object. Property is full path to JS/CSS file. Value is its JQuery Promise.
         * @type {{}}
         * @private
         */
        static _cache: Object;
        /**
         * Helper function to load all plugins with given jQuery selector
         * @param selector 	default is data attribute "[data-modr]"
         */
        static initPlugins(selector?: string): void;
        /**
         * Init plugin by single jQuery element
         * @param $element 	The jQuery element to initialize
         * @returns {JQueryPromise<{}>|boolean}	 The corresponding jQuery promise or false if nothing was loaded
         */
        static initPlugin($element: JQuery): JQueryPromise<{}> | boolean;
        /**
         * Load all files defined in configuration object
         * @param config	The Modr loader config object
         * @param $element	The jQuery element
         * @returns {JQueryPromise<{}>|boolean}  The corresponding jQuery promise or false if nothing was loaded
         */
        static load(config: Modr.Interface.LoaderConfig, $element?: JQuery): JQueryPromise<{}> | boolean;
        /**
         * Conditionally load JavaScript file
         * @param url  The URL to load
         * @param cache  Use caching
         * @returns {JQueryXHR}  The jQuery promise for the loaded file
         * @private
         */
        static _loadJavaScript(url: string, cache?: boolean): JQueryPromise<{}>;
        /**
         * Conditionally load Stylesheet file
         * @param url  The URL to load
         * @param cache  Use caching
         * @returns {JQueryXHR}  The jQuery promise for the loaded file
         * @private
         */
        static _loadStylesheet(url: string, cache?: boolean): JQueryPromise<{}>;
        /**
         * Helper to join paths preventing double or missing slashes
         * @param prefix	The first part of the path
         * @param postfix	The second part of the path, mostly the file name
         * @returns {string}	The joined or full path
         * @private
         */
        static _joinPath(prefix: string, postfix: string): string;
        /**
         * Search & replace for all given base mappings
         * @param base	The base map to replace mappings
         * @returns {string}	The replaced path
         * @private
         */
        static _replaceBaseMaps(base: string): string;
    }
}
