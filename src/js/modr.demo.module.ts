///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>

namespace Modr.Demo {
    export class Module implements Modr.Interface.JQueryPlugin {

        public _$el;
        public _options = {};

        constructor() {
            console.log('constructor Modr:Demo:Module');
        }

        public init() : void {
            console.log('init Modr:Demo:Module');

            let self = this;
            self._$el.append(' => Launched mod');
        }

        public destroy() : void {
            console.log('destroy Modr:Demo:Module');
        }
    }
}
