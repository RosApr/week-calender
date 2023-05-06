declare const _default: import("vue").DefineComponent<{
    id: {
        type: NumberConstructor;
        required: true;
    };
    selected: {
        type: ArrayConstructor;
        default: never[];
    };
}, {
    isActive: import("vue").ComputedRef<boolean>;
    handleMouseout: () => void;
    handleMouseover: (e: any, id: any) => void;
    handleMousedown: (id: any) => void;
    handleMouseup: (id: any) => void;
    handleClick: (id: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("mouseOver" | "mouseDown" | "mouseOut" | "mouseUp" | "click")[], "mouseOver" | "mouseDown" | "mouseOut" | "mouseUp" | "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: NumberConstructor;
        required: true;
    };
    selected: {
        type: ArrayConstructor;
        default: never[];
    };
}>> & {
    onMouseOver?: ((...args: any[]) => any) | undefined;
    onMouseDown?: ((...args: any[]) => any) | undefined;
    onMouseOut?: ((...args: any[]) => any) | undefined;
    onMouseUp?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    selected: unknown[];
}>;
export default _default;
