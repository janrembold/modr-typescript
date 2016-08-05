///<reference path="../declaration/jquery.d.ts" />
///<reference path="ModrPlugin.ts"/>
///<reference path="modr.core.ts"/>

namespace Modr.MyPlugin {
    export class Base implements ModrPlugin {

        init = () => {
            console.log('init Modr:MyPlugin');
            Modr.Core.getClass('MyPlugin', 'Module');

            let mod = new Modr.MyPlugin.Module();
            mod.init();
        }

        destroy = () => {}
    }
}
