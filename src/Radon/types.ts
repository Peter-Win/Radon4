/**
 * Created by PeterWin on 07.07.2019.
 */

export type TValue = string | number | boolean;

export type TFieldValue = any;

export enum Field {
    name = "name",
    label = "label",
    value = "value",
}

export type FieldName = string | Field;

export interface IStream {
    [key: string]: any;
}
