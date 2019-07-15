import {CtrlBase} from "./CtrlBase";
import {FormBase} from "./FormBase";

export type VisitorResult = any;

export interface IVisitor {
    formBegin?: (form: FormBase) => VisitorResult;
    formEnd?: (form: FormBase) => VisitorResult;
    ctrlBegin?: (ctrl: CtrlBase) => VisitorResult;
    ctrlEnd?: (ctrl: CtrlBase) => VisitorResult;
}
