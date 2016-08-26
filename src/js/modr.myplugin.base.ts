///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
///<reference path="modr.interface.loaderconfig.ts"/>

namespace Modr.MyPlugin {
    export class Base implements Modr.Interface.JQueryPlugin {

        public _$el : JQuery;
        public _options = {
            foo: 'bar'
        };

        public _dependencies = {
            variation1: [
                { name: 'MyPlugin', mod: 'Module' },
                { name: 'Helper', mod: 'Events' },
                { name: 'Polyfill', mod: 'Something', test: function() { return true; } },
                { name: 'Polyfill', mod: 'SomethingElse', test: function() { return false; } },
                { resources: ['modr.myplugin.main.css'] },
                { resources: ['bower_components/3rdpartylib/main.js'] }
            ]
        };

        /**
         * default init method
         */
        public init() : void {
            let self = this;
            self._$el.append(' => Done - Option "foo" = "' + this._options.foo + '"');

            Modr.Loader.load({
                paths: ['dist/js/modr.myplugin.module.js']
            });

            // conditional load optional modules
            // if(self._$el.data('option1') === 'dots') {
            //
            //     let config : Modr.Interface.LoaderConfig = ;
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
