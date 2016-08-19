///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>

namespace Modr.MyPlugin {
    export class Module implements Modr.Interface.JQueryPlugin {

        public _$el;
        public _options = {};

        constructor() {
            console.log('constructor Modr:MyPlugin:Module');
        }

        public init() : void {
            console.log('init Modr:MyPlugin:Module');
        }

        public destroy() : void {
            console.log('destroy Modr:MyPlugin:Module');
        }
    }
}
