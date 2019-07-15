/**
 * Created by PeterWin on 07.07.2019.
 */

import {RnComponent} from '../types';
import {IDescrConverter} from './IDescrConverter';

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
    [field: string]: any;
}
