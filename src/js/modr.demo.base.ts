///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
///<reference path="modr.interface.loaderconfig.ts"/>

namespace Modr.Demo {
	export class Base implements Modr.Interface.JQueryPlugin {

		public $element:JQuery;
		public options = {
			foo: 'bar'
		};

		public _dependencies = {
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
					{name: 'Demo', module: 'Module'}
				],
				init: function ($element?:JQuery) {
					console.log('do something');
				},
				test: function () {
					return true;
				}
			}
		};

		constructor($element:JQuery, options) {
			this.$element = $element;
			this.options = $.extend({}, this.options, options);
		}

		/**
		 * default init method
		 */
		public init():void {
			let self = this;
			self.$element.append(' => Done - Option "foo" = "' + self.options.foo + '"');

			Modr.Core.Loader.load(self._dependencies.testConfig, self.$element);
		}

		public test(value: number = 123) : void {

		}

		/**
		 * default destroy method
		 */
		public destroy():void {
		}
	}
}
