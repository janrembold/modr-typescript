///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>

namespace Modr.MyPlugin {
    export class Module implements Modr.Interface.JQueryPlugin {

        _defaults = {};

        constructor() {
            console.log('constructor Modr:MyPlugin:Module');
        }

        init = () => {
            console.log('init Modr:MyPlugin:Module');
        }

        destroy = () => {}
    }
}
