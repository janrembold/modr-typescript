///<reference path="../declaration/jquery.d.ts" />

namespace Modr {
    export class Core {

        public static initAllPlugins(selector: string = '[data-modr]') : void
        {
            $(selector).each(function() {
                Modr.Core.initPlugin($(this))
            });
        }

        // init by jquery selector? plugin name? data-modr attribute value?
        public static initPlugin( $element: JQuery ) : void
        {
            let pluginConfig = new PluginConfig(
                $element.data('namespace'),
                $element.data('plugin'),
                $element.data('options')
            );

            // get class from cache or load it
            if( !pluginConfig.isClassLoaded() ) {
                // conditional load plugin
                Modr.Helper.Loader.load(pluginConfig.getFileName());
            }

            // extend and bind plugin to element, prevent multiple instantiation
            if (!$element.data(pluginConfig.getPluginName())) {

                let plugin = pluginConfig.getInstance($element, { param1: 'test var2' });

                // call init() - defined in ModrPlugin Interface
                // plugin.init();

                // bind plugin to element
                $element.data(pluginConfig.getPluginName(), plugin);
            }
        }

    }

    class PluginConfig {

        private _namespace: string;
        private _className: string;
        private _options: Object;

        constructor(ns: string, className: string, options: Object = {})
        {
            var self = this;
            self._namespace = ns;
            self._className = className;
            self._options = options;
        }

        // public getNamespace() : string {
        //     return this._namespace;
        // }
        //
        // public getClassName() : string {
        //     return this._className;
        // }
        //
        // public getOptions() : Object {
        //     return this._options;
        // }

        public getFileName() : string {
            return 'modr.' + this._namespace.toLowerCase() + '.' + this._className.toLowerCase() + '.js';
        }

        public getPluginName() : string {
            return this._namespace.toLowerCase() + '-' + this._className.toLowerCase();
        }

        public isClassLoaded() : boolean {
            return Modr[this._namespace] && Modr[this._namespace][this._className];
        }

        public getInstance($element : JQuery, options : Object) : any {

            var self = this;
            if(self.isClassLoaded()) {

                let myPlugin = Modr[self._namespace][self._className];

                console.log('class loaded');
                console.log(myPlugin);
                console.log(JQueryBoilerplate);

                // TODO extend myPlugin with JQueryBoilerplate
                // ???????
                function extendedPlugin($element, options) {}

                // TODO instantiate extended plugin
                let myInstance = new extendedPlugin($element, options);

                // TODO call test method from super class
                // myInstance.test();

                // TODO call interface function from plugin
                // myInstance.init();

                return myInstance;
            }
        }
    }

    /**
     * The super class for all jQuery Boilerplate Plugins
     */
    class JQueryBoilerplate {

        private boiler = 'boiler dummy variable test';

        private _$el: JQuery;
        private _options: Object = {};

        /**
         * jQuery Boilerplate constructor
         *
         * @param $element  the parent jQuery element
         * @param options   the plugin options
         */
        constructor($element : JQuery, options : Object) {
            console.log('JQueryBoilerplate constructor');

            var self = this;
            self._$el = $element;

            let defaults = {}; // TODO get this._defaults aus dem erweiternden Plugin, siehe Interface ?!?
            $.extend(self._options, defaults, options);
        }

        /**
         * Some dummy test function to check inheritance
         */
        public test() : void {
            console.log('JQueryBoilerplate test = '+this.boiler);
        }
    }
}
