///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
///<reference path="modr.interface.loaderconfig.ts"/>
var Modr;
(function (Modr) {
    var Demo;
    (function (Demo) {
        var Base = (function () {
            function Base($element, options) {
                this.options = {
                    foo: 'bar'
                };
                this._dependencies = {
                    // fullConfig: {
                    // 	resources: [
                    // 		{
                    // 			paths: [
                    // 				'modr.myplugin.module.css',
                    // 				'modr.myplugin.module2.css'
                    // 			],
                    // 			base: '/cdn/v1.2/'
                    // 		},
                    // 		{
                    // 			paths: [
                    // 				'modr.myplugin.module.js',
                    // 				'boiler.js'
                    // 			]
                    // 		}
                    // 	],
                    // 	modr: [
                    // 		{name: 'MyPlugin', module: 'Module'}
                    // 	],
                    // 	init: function ($element?:JQuery) {
                    // 		console.log('do something');
                    // 	},
                    // 	test: function () {
                    // 		return true
                    // 	}
                    // },
                    testConfig: {
                        resources: [
                            {
                                paths: ['modr.demo.module.js']
                            }
                        ],
                        modr: [
                            { name: 'Demo', module: 'Module' }
                        ],
                        init: function ($element) {
                            console.log('do something');
                        },
                        test: function () {
                            return true;
                        }
                    }
                };
                this.$element = $element;
                this.options = $.extend({}, this.options, options);
            }
            /**
             * default init method
             */
            Base.prototype.init = function () {
                var self = this;
                self.$element.append(' => Done - Option "foo" = "' + self.options.foo + '"');
                Modr.Core.Loader.load(self._dependencies.testConfig, self.$element);
            };
            Base.prototype.test = function (value) {
                if (value === void 0) { value = 123; }
            };
            /**
             * default destroy method
             */
            Base.prototype.destroy = function () {
            };
            return Base;
        }());
        Demo.Base = Base;
    })(Demo = Modr.Demo || (Modr.Demo = {}));
})(Modr || (Modr = {}));
