export interface IOptionItem {
    id : string,
    displayText: string;
    value: string;
    unit_code?: string;
}

export interface IOptionRptItem {
    id : string,
    displayText: string;
    cluster?: string;
    hospital?: string;
    value: string;
}