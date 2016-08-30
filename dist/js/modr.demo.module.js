///<reference path="../declaration/jquery.d.ts" />
///<reference path="modr.interface.jqueryplugin.ts"/>
var Modr;
(function (Modr) {
    var Demo;
    (function (Demo) {
        var Module = (function () {
            function Module() {
                this._options = {};
                console.log('constructor Modr:Demo:Module');
            }
            Module.prototype.init = function () {
                console.log('init Modr:Demo:Module');
                var self = this;
                self._$el.append(' => Launched mod');
            };
            Module.prototype.destroy = function () {
                console.log('destroy Modr:Demo:Module');
            };
            return Module;
        }());
        Demo.Module = Module;
    })(Demo = Modr.Demo || (Modr.Demo = {}));
})(Modr || (Modr = {}));
