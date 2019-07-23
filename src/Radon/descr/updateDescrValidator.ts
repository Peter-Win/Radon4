/**
 * Модификация описания контроллера, добавляющая валидатор.
 * При условии, что указанный валидатор изначально отсутствует в описании контроллера.
 */
import {IDescrCtrl} from './IDescrCtrl';
import {expandValidatorDescr, IDescrValidator, TDescrValidatorExt} from './IDescrValidator';

export const updateDescrValidator = (ctrlDescr: IDescrCtrl, validatorDescrExt: TDescrValidatorExt) => {
    const result: IDescrCtrl = {...ctrlDescr};
    result.validators = result.validators? [...result.validators] : [];
    const newValidatorDescr: IDescrValidator = expandValidatorDescr(validatorDescrExt);
    const present = result.validators.find((valDescr: TDescrValidatorExt) => expandValidatorDescr(valDescr).type === newValidatorDescr.type);
    if (!present) {
        result.validators.push(newValidatorDescr);
    }
    return result;
};
