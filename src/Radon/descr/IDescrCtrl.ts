/**
 * Created by PeterWin on 07.07.2019.
 */

import {RnComponent} from "../types";
import {IDescrConverter} from "./IDescrConverter";
import {TDescrValidatorExt} from './IDescrValidator';

export type TypeCtrl = string;
export type TypeComponent = RnComponent | string;
export type TDescrConverterExt = IDescrConverter | string;

export interface IDescrCtrl {
    type: TypeCtrl;
    hidden?: boolean; // По-умолчанию = false, то есть обычно контроллер видимый
    name?: string;
    label?: string;
    tooltip?: string;
    component?: TypeComponent;
    disabled?: boolean;
    converters?: TDescrConverterExt[];
    validators?: TDescrValidatorExt[];
    cssClass?: string;
    autofocus?: boolean;
    [field: string]: any;
}

export const expandConverterExt = (sourceDescr: TDescrConverterExt): IDescrConverter => {
    if (typeof sourceDescr === "string") {
        return {type: sourceDescr};
    }
    return sourceDescr;
};
