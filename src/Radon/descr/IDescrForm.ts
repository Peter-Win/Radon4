import {IDescrCtrl} from "./IDescrCtrl";
/**
 * JSON-структура, описывающая метаданные формы
 * Created by PeterWin on 07.07.2019.
 */

export interface IDescrForm {
    name: string;
    type?: TypeForm; // by default = FormBase
    ctrls: IDescrCtrl[];
    [field: string]: any;
}

export type TypeForm = string;
