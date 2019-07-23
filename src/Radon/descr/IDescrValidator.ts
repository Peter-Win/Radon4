export type TypeValidator = string;
export interface IDescrValidator {
    type: TypeValidator;
    msg?: string;
    [field: string]: any;
}
export type TDescrValidatorExt = IDescrValidator | string;

export const expandValidatorDescr = (descrExt: TDescrValidatorExt): IDescrValidator => (
    typeof descrExt === "string" ? {type: descrExt} : descrExt
);
