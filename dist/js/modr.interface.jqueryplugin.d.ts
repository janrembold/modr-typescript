declare namespace Modr.Interface {
    interface JQueryPlugin {
        options: Object;
        $element: JQuery;
        init(): void;
        destroy(): void;
    }
}
