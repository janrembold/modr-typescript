///<reference path="../declaration/jquery.d.ts" />

namespace Modr.Helper {
    export class Loader {

        public static basePath: string = '';

        public static load(configs:Modr.Interface.LoaderConfig) : JQueryXHR {

            var deferreds = [];

            // load all files from config array
            for(var config in configs) {
                if(configs.hasOwnProperty(config)) {

                    // collect all promises
                    deferreds.push(Modr.Helper.Loader._parseConfig(config));
                }
            }

            return $.when.apply($, deferreds);

            // $.when.apply($, deferreds).done( function () {
            //     $('#display').html('Done<br />');
            //     for(var i = 0; i < arguments.length; i++) {
            //         $('#display').append('Results' + i + ' result: '
            //             + arguments[i][1] + '<br />');
            //     }
            // }).fail( function (jqXHR, status, error) {
            //     $('#display').html('Failed due to: ' + status
            //         + " " + error);
            // });
        }

        public static _parseConfig(config : Object) : JQueryXHR {
            if(1 === 1) {
                return Modr.Helper.Loader._parseStylesheet(config);
            } else {
                return Modr.Helper.Loader._parseJavaScript(config);
            }
        }

        public static _parseJavaScript(config : Object) : JQueryXHR {
            return $.ajax({
                url: this.basePath + 'url',
                dataType: 'script',
                cache: true,
                async: false
            });
        }

        public static _parseStylesheet(config : Object) : JQueryXHR {
            return $.ajax({
                url: this.basePath + 'url',
                dataType: 'script',
                cache: true,
                async: false
            });
        }

    }
}
