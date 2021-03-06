import {IDictConverters} from "./converter/CvtBase";
import {IDictCtrls} from "./CtrlBase";
import {IDictForms} from "./FormBase";
import {IDictComponents} from "./types";
import {IDictValidators} from './validator/ValidatorBase';
/**
 * Created by PeterWin on 07.07.2019.
 */

export class Rn {
    public static dict: IDictEntities = {
        ctrls: {} as IDictCtrls,
        forms: {} as IDictForms,
        components: {} as IDictComponents,
        converters: {} as IDictConverters,
        validators: {} as IDictValidators,
    };
    public static regCtrls(dict: IDictCtrls = {}) {
        Object.keys(dict).forEach((key) => {
            Rn.dict.ctrls[key] = dict[key];
        });
    }
    public static regForms(dict: IDictForms = {}) {
        Object.keys(dict).forEach((key) => Rn.dict.forms[key] = dict[key]);
    }
    public static regComponents(dict: IDictComponents = {}) {
        Object.keys(dict).forEach((key) => Rn.dict.components[key] = dict[key]);
    }
    public static regConverters(dict: IDictConverters = {}) {
        Object.keys(dict).forEach((key) => Rn.dict.converters[key] = dict[key]);
    }
    public static regValidators(dict: IDictValidators = {}) {
        Object.keys(dict).forEach((key) => Rn.dict.validators[key] = dict[key]);
    }
    public static reg(dict: IDictEntities): void {
        Rn.regCtrls(dict.ctrls);
        Rn.regForms(dict.forms);
        Rn.regComponents(dict.components);
        Rn.regConverters(dict.converters);
        Rn.regValidators(dict.validators);
    }
}

interface IDictEntities {
    ctrls?: IDictCtrls;
    forms?: IDictForms;
    components?: IDictComponents;
    converters?: IDictConverters;
    validators?: IDictValidators;
}
