///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
///<reference path="modr.core.ts"/>

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

            this._$el.html('Plugin Base loaded');

            // Modr.Core.getClass('MyPlugin', 'Module');
            //
            // let mod = new Modr.MyPlugin.Module();
            // mod.init();
        }

        /**
         * default destroy method
         */
        public destroy() : void {}
    }
}
