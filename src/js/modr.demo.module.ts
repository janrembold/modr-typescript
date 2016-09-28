///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>

namespace Modr.Demo {
	export class Module implements Modr.Interface.JQueryPlugin {

		public $element:JQuery;
		public options = {
			var1: true
		};

		constructor($element:JQuery, options) {
			this.$element = $element;
			this.options = $.extend({}, this.options, options);
		}

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
