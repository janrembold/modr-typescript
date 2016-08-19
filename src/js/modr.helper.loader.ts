///<reference path="../declaration/jquery.d.ts" />

namespace Modr.Helper {
    export class Loader {

        public static basePath: string = '';

        public static load(config:Modr.Interface.LoaderConfig) : JQueryXHR {

            return $.ajax({
                url: this.basePath + url,
                dataType: 'script',
                cache: true,
                async: false
            });
        }

    }
}
