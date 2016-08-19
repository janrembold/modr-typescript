namespace Modr.Interface {
    export interface JQueryPlugin {
        _options: Object;
        _$el: JQuery;

        init() : void;
        destroy() : void;
    }
}
