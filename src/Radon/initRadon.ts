/**
 * Created by PeterWin on 07.07.2019.
 */
import {CheckBox} from "./component/CheckBox";
import {ResetStd} from "./component/ResetStd";
import {StringStd} from "./component/StringStd";
import {SubmitStd} from "./component/SubmitStd";
import {TextArea} from "./component/TextArea";
import {CvtNumber} from "./converter/CvtNumber";
import {CtrlBoolean} from "./ctrl/CtrlBoolean";
import {CtrlInteger} from "./ctrl/CtrlInteger";
import {CtrlReset} from "./ctrl/CtrlReset";
import {CtrlString} from "./ctrl/CtrlString";
import {CtrlSubmit} from "./ctrl/CtrlSubmit";
import {FormBase} from "./FormBase";
import {Rn} from "./Rn";
import {BlockStd} from './component/BlockStd';
import {CtrlBlock} from './ctrl/CtrlBlock';
import {SliderStd} from './component/SliderStd';
import {CtrlRange} from './ctrl/CtrlRange';
import {ValidatorNonEmpty} from './validator/ValidatorNonEmpty';
import {CvtExcludeEmpty} from './converter/CvtExcludeEmpty';
import {ValidatorRegExp} from './validator/ValidatorRegExp';
import {CtrlTabHost} from './ctrl/CtrlTabHost';
import {TabHost} from './component/TabHost';
import {CtrlTabPage} from './ctrl/CtrlTabPage';
import {CtrlDropList} from './ctrl/CtrlDropList';
import {SelectStd} from './component/SelectStd';

export const initRadon = () => {
    Rn.reg({
        converters: {
            ExcludeEmpty: CvtExcludeEmpty,
            Number: CvtNumber,
        },
        components: {
            BlockStd,
            CheckBox,
            ResetStd,
            SelectStd,
            SliderStd,
            StringStd,
            SubmitStd,
            TabHost,
            TextArea,
        },
        ctrls: {
            Block: CtrlBlock,
            Boolean: CtrlBoolean,
            DropList: CtrlDropList,
            Integer: CtrlInteger,
            Range: CtrlRange,
            Reset: CtrlReset,
            String: CtrlString,
            Submit: CtrlSubmit,
            TabHost: CtrlTabHost,
            TabPage: CtrlTabPage,
        },
        forms: {
            Base: FormBase,
        },
        validators: {
            NonEmpty: ValidatorNonEmpty,
            RegExp: ValidatorRegExp,
        },
    });
};
