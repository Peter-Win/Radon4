/**
 * Created by PeterWin on 07.07.2019.
 */

import {CommonComponent, CommonComponentClass} from './component/CommonComponent';

export type TValue = string | number | boolean;

export type TFieldValue = any;

export const Field = {
    autofocus: "autofocus",
    default: "default",
    disabled: "disabled",
    disabledIf: "disabledIf",
    errMsg: "errMsg",
    hidden: "hidden",
    label: "label",
    name: "name",
    option: "option",
    regExp: "regExp",
    value: "value",
    visibleIf: "visibleIf",
}

export type FieldName = string;

export interface IStream {
    [key: string]: any;
}

export type RnComponent = typeof CommonComponent | typeof CommonComponentClass | null;

export interface IDictComponents {
    [key: string]: RnComponent;
}
