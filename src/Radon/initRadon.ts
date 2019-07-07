/**
 * Created by PeterWin on 07.07.2019.
 */
import {CtrlValue} from "./ctrl/CtrlValue";
import {Rn} from "./Rn";

export const initRadon = () => {
    Rn.regCtrls({
        Value: CtrlValue,
    });
};
