///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.loaderconfig.ts"/>

namespace Modr.Core {
	export class Loader {

		/**
		 * Base path - default for all given files
		 * @type {string}
         */
		public static base:string = '';

		/**
		 * Object of base path mappings
		 * @type {{}}
         */
		public static baseMap:Object = {};

		/**
		 * Cache object. Property is full path to JS/CSS file. Value is its JQuery Promise.
		 * @type {{}}
         * @private
         */
		public static _cache:Object = {};

		/**
		 * Helper function to load all plugins with given jQuery selector
		 * @param selector 	default is data attribute "[data-modr]"
         */
		public static initPlugins(selector:string = '[data-modr]'):void {

			$(selector).each(function () {
				Modr.Core.Loader.initPlugin($(this));
			});
		}

		/**
		 * Init plugin by single jQuery element
		 * @param $element 	The jQuery element to initialize
		 * @returns {JQueryPromise<{}>|boolean}	 The corresponding jQuery promise or false if nothing was loaded
         */
		public static initPlugin($element:JQuery):JQueryPromise<{}> | boolean {

			// init with required resources array
			let config:Modr.Interface.LoaderConfig = {
				resources: $element.data('resources')
			};

			// add optional modr configuration
			if ($element.data('modr')) {
				config.modr = $element.data('modr');
			}

			// add optional plugin init function
			if ($element.data('init')) {
				let init = eval($element.attr('data-init'));
				if ($.isFunction(init)) {
					config.init = init;
				}
			}

			// add optional plugin test function
			if ($element.data('test')) {
				let test = eval($element.attr('data-test'));
				if ($.isFunction(test)) {
					config.test = test;
				}
			}

			// add optional options
			if ($element.data('options')) {
				config.options = $element.data('options');
			}

			// conditionally load plugins and styles
			return Modr.Core.Loader.load(config, $element);
		}

		/**
		 * Load all files defined in configuration object
		 * @param config	The Modr loader config object
		 * @param $element	The jQuery element
         * @returns {JQueryPromise<{}>|boolean}  The corresponding jQuery promise or false if nothing was loaded
         */
		public static load(config:Modr.Interface.LoaderConfig, $element?:JQuery):JQueryPromise<{}> | boolean {

			let deferreds = [];

			// check optional test function
			if ($.isFunction(config.test) && !config.test()) {
				return false;
			}

			// check all resources
			for (let i = 0, resLen = config.resources.length; i < resLen; ++i) {
				let resource = config.resources[i];

				// collect all paths
				for (let j = 0, pathLen = resource.paths.length; j < pathLen; ++j) {
					let path = resource.paths[j];

					// check optional base path override
					let base = resource.hasOwnProperty('base') ? resource.base : Modr.Core.Loader.base;
					base = Modr.Core.Loader._replaceBaseMaps(base);

					// build url
					let url = Modr.Core.Loader._joinPath(base, path);

					// check cache first
					if (Modr.Core.Loader._cache.hasOwnProperty(url)) {
						deferreds.push(Modr.Core.Loader._cache[url]);
						continue;
					}

					// choose loader by file type
					let promise;
					if (url.indexOf('.css', url.length - 4) !== -1) {
						promise = Modr.Core.Loader._loadStylesheet(url);

					} else if (url.indexOf('.js', url.length - 3) !== -1) {
						promise = Modr.Core.Loader._loadJavaScript(url);

					} else {
						throw 'Unknown file format: ' + url;
					}

					// add promise to cache
					if (promise) {
						Modr.Core.Loader._cache[url] = promise;
						deferreds.push(promise);
					}
				}
			}

			// check possible empty deferred array
			if (deferreds.length === 0) {
				return false;
			}

			return $.when.apply($, deferreds).done(function () {

				// extend and init modr plugins
				if ($.isArray(config.modr)) {
					for (let i = 0, len = config.modr.length; i < len; ++i) {
						let name = config.modr[i].name;
						let module = config.modr[i].module;

						if (Modr[name] && Modr[name][module]) {

							// inject jquery boilerplate defaults
							$.extend(Modr[name][module].prototype, {
								_$el: $element,
								__modrExtend: function () {
									// extend defaults with component options
									this._options = $.extend({}, this._options, config.options);
									return this;
								}
							});

							// instantiate modr plugin and init/extend boilerplate
							let myInstance = new Modr[name][module]($element, {});
							myInstance.__modrExtend().init();
						}
					}
				}

				// call init function
				if ($.isFunction(config.init)) {
					config.init($element);
				}
			});
		}

		/**
		 * Conditionally load JavaScript file
		 * @param url  The URL to load
		 * @param cache  Use caching
		 * @returns {JQueryXHR}  The jQuery promise for the loaded file
         * @private
         */
		public static _loadJavaScript(url:string, cache:boolean = true):JQueryPromise<{}> {
			return $.ajax({
				url: url,
				dataType: 'script',
				cache: cache
			});
		}

		/**
		 * Conditionally load Stylesheet file
		 * @param url  The URL to load
		 * @param cache  Use caching
		 * @returns {JQueryXHR}  The jQuery promise for the loaded file
		 * @private
		 */
		public static _loadStylesheet(url:string, cache:boolean = true):JQueryPromise<{}> {
			return $.ajax({
				url: url,
				dataType: 'text',
				cache: cache,
				success: function () {
					$('<link>', {
						rel: 'stylesheet',
						type: 'text/css',
						'href': url
					}).appendTo('head');
				}
			});
		}

		/**
		 * Helper to join paths preventing double or missing slashes
		 * @param prefix	The first part of the path
		 * @param postfix	The second part of the path, mostly the file name
		 * @returns {string}	The joined or full path
         * @private
         */
		public static _joinPath(prefix:string, postfix:string):string {
			let prefixLength:number = prefix.length;
			let postfixLength:number = postfix.length;
			let prefixHasSeparator:boolean = prefixLength > 0 ? (prefix[prefixLength-1] === '/') : false;
			let postfixHasSeparator:boolean = postfixLength > 0 ? (postfix[0] === '/') : false;
			let separator:string = '';

			if(prefixLength > 0 && postfixLength > 0) {
				if(!prefixHasSeparator && !postfixHasSeparator) {
					separator = '/';
				} else if(prefixHasSeparator && postfixHasSeparator) {
					prefix = prefix.slice(0, -1);
				}
			}

			return prefix + separator + postfix;
		}

		/**
		 * Search & replace for all given base mappings
		 * @param base	The base map to replace mappings
		 * @returns {string}	The replaced path
         * @private
         */
		public static _replaceBaseMaps(base:string):string {
			for(var search in Modr.Core.Loader.baseMap) {
				if(Modr.Core.Loader.baseMap.hasOwnProperty(search)) {
					let replace = Modr.Core.Loader.baseMap[search];
					base = base.replace(new RegExp(search, 'g'), replace);
				}
			}

			return base;
		}
	}
}
