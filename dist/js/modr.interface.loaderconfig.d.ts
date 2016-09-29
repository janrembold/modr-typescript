/// <reference path="../declaration/jquery.d.ts" />
declare namespace Modr.Interface {
    interface LoaderConfigDefault {
        init?: ($element?: JQuery) => void;
        test?: () => boolean;
        options?: Object;
    }
    interface LoaderConfigModr {
        name: string;
        module: string;
    }
    interface LoaderConfigLegacy {
        paths: Array<string>;
        base?: string;
        test?: () => boolean;
    }
    interface LoaderConfig extends LoaderConfigDefault {
        resources: Array<LoaderConfigLegacy>;
        modr?: Array<LoaderConfigModr>;
    }
}
