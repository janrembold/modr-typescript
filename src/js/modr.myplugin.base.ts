///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
///<reference path="modr.interface.loaderconfig.ts"/>

namespace Modr.MyPlugin {
    export class Base implements Modr.Interface.JQueryPlugin {

        public _$el;
        public _options = {
            param1: 'default param1',
            param2: 'default param2'
        };

        /**
         * default init method
         */
        public init() : void {
            console.log('init Modr:MyPlugin');
            console.log(this._options.param1);

            let self = this;
            self._$el.html('Plugin Base loaded');

            // conditional load optional modules
            if(self._$el.data('option1') === 'dots') {

                let config : Modr.Interface.LoaderConfig = [
                    { ns: 'MyPlugin', pluginName: 'Module' },
                    { ns: 'Helper', pluginName: 'Events' },
                    { file: 'bower_components/3rdpartylib/main.js' }
                ];

                // let config:Modr.Interface.LoaderConfig = [
                //     {'MyPlugin': 'Module'},
                //     {'Helper': 'Events'},
                //     'bower_components/3rdpartylib/main.js'
                // ];

                Modr.Helper.Loader.load([{
                    ns: 'MyPlugin',
                    pluginName: 'Module'
                }]);
            }
        }

        /**
         * default destroy method
         */
        public destroy() : void {}
    }
}
