import {IDescrCtrl} from "../descr/IDescrCtrl";
import {updateDescrConverter} from "../descr/updateDescrConverter";
import {CtrlString} from "./CtrlString";
import {updateDescrValidator} from '../descr/updateDescrValidator';

export class CtrlInteger extends CtrlString {
    protected transformDescr(descr: IDescrCtrl): IDescrCtrl {
        descr = updateDescrConverter(descr, "Number");
        descr = updateDescrValidator(descr, {type: "RegExp", regExp: "/^\\d*$/"});
        return descr;
    }
}
