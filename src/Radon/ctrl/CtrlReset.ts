
import {CtrlBase} from "../CtrlBase";
import {TypeComponent} from "../descr/IDescrCtrl";

export class CtrlReset extends CtrlBase {
    protected getDefaultComponent(): TypeComponent {
        return "ResetStd";
    }
}
