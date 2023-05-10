import { getFullWeekAndTime } from "./helper";
declare const __default__: import("vue").DefineComponent<{
    value: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    disabled: import("vue").ComputedRef<boolean>;
    handleMousedown: (id: any) => void;
    handleMouseup: (id: any) => void;
    handleMouseout: () => void;
    handleMouseover: (id: any, tooltip: any) => void;
    showTooltip: import("vue").Ref<{
        left: string;
        top: string;
        show: boolean;
        id: number;
    }>;
    currentSelected: import("vue").ComputedRef<any[]>;
    Time: number[];
    Week: string[];
    getFullWeekAndTime: typeof getFullWeekAndTime;
    handleReset: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:value" | "change")[], "update:value" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    value: string;
    disabled: boolean;
}>;
export default __default__;
