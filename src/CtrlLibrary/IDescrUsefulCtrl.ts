/**
 * Интерфейс для описания полезного контрола через JSON
 */
import {IDescrCtrl} from "../Radon/descr/IDescrCtrl";

export interface IDescrUsefulCtrl {
    name: string;   // Имя, зарегистрированное в Rn.descr.ctrls
    superClass: string; // Имя, зарегистрированние в Rn.descr.ctrls
    label: string;  // Русскоязычный текст с название контрола

    // Описание иконки. Совместимо с CSS background url. например:
    // url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 13 8...
    icon?: string;

    // Раздел в палитре.
    // Если пустая строка, то не появляется. Если не указан, то наследуется от суперкласса.
    partition?: string;

    props?: IDescrCtrl[]; // По-сути, описание формы свойств
    // Свойства суперкласса тоже включаются.
    // Если свойство есть и в props и в superClass.props, то оно полностью замещается в props
    // Если нужно избавиться от свойства суперкласса, то его надо добавить в список remove
    remove?: string[];
}
