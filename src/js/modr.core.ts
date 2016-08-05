///<reference path="../declaration/jquery.d.ts" />

namespace Modr {
    export class Core {

        public static initAllPlugins() : void
        {
            let self = this;

            $('[data-modr]').each(function() {
                let $element = $(this);
                let ns = $element.data('namespace');
                let className = $element.data('plugin');
                let options = $element.data('options') || {};
                let pluginHelper = new PluginHelper(ns, className);

                // get class from cache or load it
                self.getClass(ns, className);

                // bind plugin to element
                if (!$element.data(pluginHelper.getPluginName())) {
                    let plugin = new Modr[ns][className]($element, options);
                    plugin.init();

                    $element.data(pluginHelper.getPluginName(), plugin);
                }
            });

            // add base class to jQuery plugin
            // $.fn[pluginName] = function(options: any) {
            //     return this.each(function() {
            //         if (!$.data(this,pluginName)) {
            //             $.data(this, pluginName, new Modr[ns][plugin](this, options));
            //         }
            //     });
            // };
        }

        // init by jquery selector? plugin name? data-modr attribute value?
        // public static initPlugin( ??? ) : void {
        //
        // }

        public static getClass(ns: string, className: string) {
            let pluginHelper = new PluginHelper(ns, className);

            // check class existence
            if(!Modr[ns] || !Modr[ns][className]) {
                // conditional load plugin
                Modr.Helper.Loader.load(pluginHelper.getFileName(), ns, className);
            }
        }
    }

    class PluginHelper {
        private _namespace: string;
        private _pluginName: string;

        constructor(ns, pluginName) {
            this._namespace = ns;
            this._pluginName = pluginName;
        }

        public getFileName() : string {
            return 'modr.' + this._namespace.toLowerCase() + '.' + this._pluginName.toLowerCase() + '.js';
        }

        public getPluginName() : string {
            return this._namespace.toLowerCase() + '-' + this._pluginName.toLowerCase();
        }
    }
}
