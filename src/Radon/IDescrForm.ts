import {IDescrCtrl} from "./descr/IDescrCtrl";
/**
 * JSON-структура, описывающая метаданные формы
 * Created by PeterWin on 07.07.2019.
 */

export interface IDescrForm {
    name: string;
    ctrls: IDescrCtrl[];
}
