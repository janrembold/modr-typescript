///<reference path="../declaration/jquery.d.ts" />

namespace Modr {
    export class Core {

        public static initPlugins(selector:string = '[data-modr]') : void {

            $(selector).each(function () {
                Modr.Core.initPlugin($(this))
            });
        }

        // init by jquery selector? plugin name? data-modr attribute value?
        public static initPlugin($element:JQuery) : void {

            let config: Modr.Interface.LoaderConfig;

            // check configuration type: modr or custom plugin
            if($element.data('resources')) {
                // load legacy plugin
                config = Modr.Helper.Loader.prepareLegacyConfig($element);

            } else if($element.data('name') && $element.data('mod')) {
                // load modr plugin
                config = Modr.Helper.Loader.prepareModrConfig($element);

            } else {
                throw 'Unknown plugin format';
            }

            // conditionally load plugins and styles
            Modr.Helper.Loader.load(config);

            // let pluginConfig = new PluginConfig(
            //     $element.data('namespace'),
            //     $element.data('plugin'),
            //     $element.data('options')
            // );

            // let namespace = $element.data('namespace');
            // let mod = $element.data('plugin');
            // let options = $element.data('options');
            // let url = 'modr.' + namespace.toLowerCase() + '.' + mod.toLowerCase() + '.js';
            //
            // // get class from cache or load it
            // // if (!pluginConfig.isClassLoaded()) {
            //
            //     // conditional load plugin
            //     Modr.Helper.Loader.load({
            //         file: url
            //     }, function() {
            //         // extend and bind plugin to element, prevent multiple instantiation
            //         // if (!$element.data(pluginConfig.getPluginName())) {
            //
            //         console.log('init');
            //
            //         // let plugin = pluginConfig.getInstance($element, {param1: 'test var2'});
            //             //
            //             // // call init() - defined in ModrPlugin Interface
            //             // plugin.init();
            //             //
            //             // // bind plugin to element
            //             // $element.data(pluginConfig.getPluginName(), plugin);
            //         // }
            //     });
            //
            // // }
        }

        // public static _initModrPlugin($element : JQuery): Modr.Interface.LoaderConfig {
        //
        //     // Modr.Helper.Loader.load(config, function() {
        //     //     // extend and bind plugin to element, prevent multiple instantiation
        //     //     // if (!$element.data(pluginConfig.getPluginName())) {
        //     //
        //     //     console.log('init');
        //     //
        //     //     // let plugin = pluginConfig.getInstance($element, {param1: 'test var2'});
        //     //     //
        //     //     // // call init() - defined in ModrPlugin Interface
        //     //     // plugin.init();
        //     //     //
        //     //     // // bind plugin to element
        //     //     // $element.data(pluginConfig.getPluginName(), plugin);
        //     //     // }
        //     // });
        //
        //     let config : Modr.Interface.LoaderConfig = { paths: [] };
        //     let name = $element.data('name');
        //     let mod = $element.data('mod');
        //
        //     // add base plugin
        //     config.paths.push('modr.' + name.toLowerCase() + '.' + mod.toLowerCase() + '.js');
        //
        //     // add optional options object
        //     if($element.data('options')) {
        //         config.options = $element.data('options');
        //     }
        //
        //     // TODO extend with data attributes for base, init, test
        //
        //     return config;
        // }
        //
        // public static _initCustomPlugin($element : JQuery): Modr.Interface.LoaderConfig {
        //
        //     let config : Modr.Interface.LoaderConfig = { paths: [] };
        //
        //     console.log(eval($element.data('resources')));
        //
        //     // add optional init method
        //     if($element.data('init')) {
        //         config.init = eval($element.attr('data-init'));
        //     }
        //
        //     return config;
        // }

    }

    // class PluginConfig {
    //
    //     private _namespace:string;
    //     private _className:string;
    //     private _options:Object;
    //
    //     constructor(ns:string, className:string, options:Object = {}) {
    //         var self = this;
    //         self._namespace = ns;
    //         self._className = className;
    //         self._options = options;
    //     }
    //
    //     public getNamespace() : string {
    //         return this._namespace;
    //     }
    //
    //     public getClassName() : string {
    //         return this._className;
    //     }
    //
    //     // public getOptions() : Object {
    //     //     return this._options;
    //     // }
    //
    //     public getFileName():string {
    //         return 'modr.' + this._namespace.toLowerCase() + '.' + this._className.toLowerCase() + '.js';
    //     }
    //
    //     public getPluginName():string {
    //         return this._namespace.toLowerCase() + '-' + this._className.toLowerCase();
    //     }
    //
    //     public isClassLoaded():boolean {
    //         return Modr[this._namespace] && Modr[this._namespace][this._className];
    //     }
    //
    //     public getInstance($element:JQuery, options:Object):any {
    //         var self = this;
    //
    //         if (self.isClassLoaded()) {
    //             // inject jquery boilerplate defaults
    //             $.extend(Modr[self._namespace][self._className].prototype, {
    //                 _$el: $element,
    //                 _modrExtend: function () {
    //                     // extend defaults with component options
    //                     this._options = $.extend({}, this._options, options);
    //                 }
    //                 // _modrLoad: function(config:Object) {
    //                 //     if (!self.isClassLoaded()) {
    //                 //         // conditional load plugin
    //                 //         Modr.Helper.Loader.load(self.getFileName());
    //                 //     }
    //                 // }
    //             });
    //
    //             // instantiate modr plugin and init/extend boilerplate
    //             let myInstance = new Modr[self._namespace][self._className]($element, options);
    //             myInstance._modrExtend();
    //
    //             // return instantiated and extended plugin
    //             return myInstance;
    //         }
    //     }
    // }

}
