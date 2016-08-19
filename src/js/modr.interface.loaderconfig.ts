namespace Modr.Interface {
    export interface LoaderConfig {
        [index: number]: { ns: string; pluginName: string; } | { file: string; };
    }
}
