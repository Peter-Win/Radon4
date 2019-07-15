/**
 * Created by PeterWin on 07.07.2019.
 */
import {CtrlString} from "./ctrl/CtrlString";
import {CvtNumber} from './converter/CvtNumber';
import {FormBase} from "./FormBase";
import {Rn} from "./Rn";
import {StringStd} from './component/StringStd';
import {SubmitStd} from './component/SubmitStd';
import {TextArea} from './component/TextArea';
import {CtrlSubmit} from './ctrl/CtrlSubmit';
import {CheckBox} from './component/CheckBox';
import {CtrlBoolean} from './ctrl/CtrlBoolean';
import {ResetStd} from './component/ResetStd';
import {CtrlReset} from './ctrl/CtrlReset';

export const initRadon = () => {
    Rn.reg({
        converters: {
            Number: CvtNumber,
        },
        components: {
            CheckBox,
            ResetStd,
            StringStd,
            SubmitStd,
            TextArea,
        },
        ctrls: {
            Boolean: CtrlBoolean,
            Reset: CtrlReset,
            String: CtrlString,
            Submit: CtrlSubmit,
        },
        forms: {
            Base: FormBase,
        },
    });
};
