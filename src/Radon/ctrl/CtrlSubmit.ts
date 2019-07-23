import {CtrlBase} from "../CtrlBase";
import {TypeComponent} from "../descr/IDescrCtrl";

export class CtrlSubmit extends CtrlBase {
    protected getDefaultComponent(): TypeComponent {
        return "SubmitStd";
    }
}
