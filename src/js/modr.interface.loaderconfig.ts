///<reference path="../declaration/jquery.d.ts"/>

namespace Modr.Interface {
    export interface LoaderConfigDefault {
        init?: ($element?: JQuery) => void;
        test?: () => boolean;
        options?: Object;
    }

	export interface LoaderConfigModr {
        name: string;
        module: string;
    }

	export interface LoaderConfigLegacy {
        paths: Array<string>;
        base?: string;
        test?: () => boolean;
    }

    export interface LoaderConfig extends LoaderConfigDefault {
        resources: Array<LoaderConfigLegacy>;
        modr?: Array<LoaderConfigModr>;
    }
}
