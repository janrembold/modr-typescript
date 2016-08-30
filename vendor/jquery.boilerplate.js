/**
 * @name          jQuery Boilerplate
 * @version       1.0
 * @lastmodified  2015-04-24
 * @package       html-css-js
 * @subpackage    jQuery plugin
 * @author        JR, VI
 *
 * based on: http://jqueryboilerplate.com/
 */

;(function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'boilerplate',
        defaults = {
            foo: 'bar'
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    // methods
    var methods = {
        init: function() {
            this.$element.append(' => Done - Option "foo" = "' + this.options.foo + '"');
        }
    };

    // build
    $.extend(Plugin.prototype, methods);

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if(!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);
