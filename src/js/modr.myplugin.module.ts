///<reference path="../declaration/jquery.d.ts" />
///<reference path="ModrPlugin.ts"/>

namespace Modr.MyPlugin {
    export class Module implements ModrPlugin {
        constructor() {
            console.log('constructor Modr:MyPlugin:Module');
        }

        init = () => {
            console.log('init Modr:MyPlugin:Module');
        }

        destroy = () => {}
    }
}
