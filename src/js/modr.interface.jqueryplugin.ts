namespace Modr.Interface {
    export interface JQueryPlugin {
        options: Object;
        $element: JQuery;

        init() : void;
        destroy() : void;
    }
}
