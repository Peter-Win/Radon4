import {IDictCtrls} from "./CtrlBase";
import {IDictForms} from "./FormBase";
/**
 * Created by PeterWin on 07.07.2019.
 */

export class Rn {
    public static dict = {
        ctrls: {} as IDictCtrls,
        forms: {} as IDictForms,
    };
    public static regCtrls(dict: IDictCtrls) {
        Object.keys(dict).forEach((key) => {
            Rn.dict.ctrls[key] = dict[key];
        });
    }
}
