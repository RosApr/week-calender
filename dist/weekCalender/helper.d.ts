export declare const Week: string[];
export declare const Time: number[];
export declare const singleRowColCount = 48;
export declare const defaultValue: string;
export declare const defaultValueBitMap: string[];
export declare function getTime(id: any): string;
export declare function getFullWeekAndTime(index: any): string;
export declare function getIdFromTime(time: any): number;
export declare function getTimeGridPos(id: any): {
    row: number;
    col: number;
};
export declare function getPeriodTime(id: any, periodLength: any): string;
export declare const defaultPos: {
    row: undefined;
    col: undefined;
};
