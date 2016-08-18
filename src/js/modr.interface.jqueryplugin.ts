namespace Modr.Interface {
    export interface JQueryPlugin {
        _defaults : Object;

        init() : void;
        destroy() : void;
    }
}
