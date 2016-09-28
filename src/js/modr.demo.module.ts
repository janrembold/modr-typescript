///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>

namespace Modr.Demo {
    export class Module implements Modr.Interface.JQueryPlugin {

        public $element;
        public options = {};

        public init() : void {
            console.log('init Modr:Demo:Module');

            let self = this;
            self.$element.append(' => Launched mod');
        }

        public destroy() : void {
            console.log('destroy Modr:Demo:Module');
        }
    }
}
