///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
///<reference path="modr.interface.loaderconfig.ts"/>

namespace Modr.MyPlugin {
    export class Base implements Modr.Interface.JQueryPlugin {

        public _$el : JQuery;
        public _options = {
            foo: 'bar'
        };

        /**
         * default init method
         */
        public init() : void {
            let self = this;
            self._$el.append(' => Done - Option "foo" = "' + this._options.foo + '"');

            // conditional load optional modules
            // if(self._$el.data('option1') === 'dots') {
            //
            //     let config : Modr.Interface.LoaderConfig = [
            //         { name: 'MyPlugin', mod: 'Module' },
            //         { name: 'Helper', mod: 'Events' },
            //         { name: 'Polyfill', mod: 'Something', test: function() { return true; } },
            //         { name: 'Polyfill', mod: 'SomethingElse', test: function() { return false; } },
            //         { paths: ['modr.myplugin.main.css'] },
            //         { paths: ['bower_components/3rdpartylib/main.js'] }
            //     ];
            //
            //     // let config2 = [
            //     //     'MyPlugin:Module',
            //     //     'Helper:Events',
            //     //     'modr.myplugin.main.css',
            //     //     'bower_components/3rdpartylib/main.js'
            //     // ];
            //
            //     // let config:Modr.Interface.LoaderConfig = [
            //     //     {'MyPlugin': 'Module'},
            //     //     {'Helper': 'Events'},
            //     //     'bower_components/3rdpartylib/main.js'
            //     // ];
            //
            //     Modr.Helper.Loader.load(config);
            // }
        }

        /**
         * default destroy method
         */
        public destroy() : void {}
    }
}
