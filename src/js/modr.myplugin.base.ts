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
            full: {

                resources: [
                    {
                        paths: [
                            'modr.myplugin.module.css',
                            'modr.myplugin.module2.css'
                        ],
                        base: '/cdn/v1.2/'
                    },
                    {
                        paths: [
                            'modr.myplugin.module.js',
                            'boiler.js'
                        ]
                    }
                ],
                modr: [
                    { name: 'MyPlugin', module: 'Module' }
                ],
                init: function($element?: JQuery) { console.log('do something'); },
                test: function() { return true }
            },

            mod: {

                resources: [
                    {
                        paths: [ 'modr.myplugin.module.js' ]
                    }
                ],
                modr: [
                    { name: 'MyPlugin', module: 'Module' }
                ],
                init: function($element?: JQuery) { console.log('do something'); },
                test: function() { return true; }
            }
        };

        /**
         * default init method
         */
        public init() : void {
            let self = this;
            self._$el.append(' => Done - Option "foo" = "' + this._options.foo + '"');

            Modr.Loader.load(self._dependencies.mod, self._$el);
        }

        /**
         * default destroy method
         */
        public destroy() : void {}
    }
}
