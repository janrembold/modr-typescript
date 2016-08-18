///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
///<reference path="modr.core.ts"/>

namespace Modr.MyPlugin {
    export class Base implements Modr.Interface.JQueryPlugin {

        _defaults = {
            param1: 'default params1'
        };

        constructor() {
            console.log('Base constructor');
        }

        public init() : void {
            console.log('init Modr:MyPlugin');
            // Modr.Core.getClass('MyPlugin', 'Module');
            //
            // let mod = new Modr.MyPlugin.Module();
            // mod.init();
        }

        public destroy() : void {}
    }
}
