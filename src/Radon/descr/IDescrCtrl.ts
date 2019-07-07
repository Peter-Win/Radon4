/**
 * Created by PeterWin on 07.07.2019.
 */

export type TypeCtrl = string;

export interface IDescrCtrl {
    type: TypeCtrl;
    name?: string;
    label?: string;
    [field: string]: any;
}
