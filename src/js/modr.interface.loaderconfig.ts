namespace Modr.Interface {
    interface LoaderConfigDefault {
        init?: () => void;
        test?: () => boolean;
        options?: Object;
    }

    export interface LoaderConfig extends LoaderConfigDefault {
        paths: Array<string>;
    }
}
