namespace Modr.Interface {
    export interface LoaderConfig {
        [index: number]: { ns: string; mod: string; test?: () => boolean } | { file: string; test?: () => boolean };
    }
}
