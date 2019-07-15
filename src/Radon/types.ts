/**
 * Created by PeterWin on 07.07.2019.
 */

import {CommonComponent} from './component/CommonComponent';

export type TValue = string | number | boolean;

export type TFieldValue = any;

export enum Field {
    default = "default",
    disabled = "disabled",
    disabledIf = "disabledIf",
    hidden = "hidden",
    name = "name",
    label = "label",
    value = "value",
    visibleIf = "visibleIf",
}

export type FieldName = string | Field;

export interface IStream {
    [key: string]: any;
}

export type RnComponent = typeof CommonComponent | null;

export interface IDictComponents {
    [key: string]: RnComponent;
}
