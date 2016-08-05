///<reference path="../declaration/jquery.d.ts" />

namespace Modr.Helper {
    export class Loader {

        public static basePath: string = '';

        public static load(url: string, ns: string, plugin: string) {
            if(!(Modr[ns] && Modr[ns][plugin])) {
                $.ajax({
                    url: this.basePath + url,
                    dataType: 'script',
                    cache: true,
                    async: false
                });
            }

            return Modr[ns][plugin];
        }

    }
}
