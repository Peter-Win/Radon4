/**
 * Добавление конвертера, если такой отсутствует в исходном описании
 * Используется для модификации исходного описания конторллера.
 */
import {IDescrConverter} from "./IDescrConverter";
import {expandConverterExt, IDescrCtrl, TDescrConverterExt} from "./IDescrCtrl";

export const updateDescrConverter = (ctrlDescr: IDescrCtrl, newCvtDescrExt: TDescrConverterExt): IDescrCtrl => {
    const result: IDescrCtrl = {...ctrlDescr};
    result.converters = result.converters ? [...result.converters] : [];
    const newCvtDescr: IDescrConverter = expandConverterExt(newCvtDescrExt);
    const present = result.converters.find((cvtDescr: TDescrConverterExt) => expandConverterExt(cvtDescr).type === newCvtDescr.type);
    if (!present) {
        result.converters.push(newCvtDescr);
    }
    return result;
};
