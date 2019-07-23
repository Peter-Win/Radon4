import {StringStd} from "../component/StringStd";
import {TypeComponent} from "../descr/IDescrCtrl";
import {CtrlValue} from "./CtrlValue";

export class CtrlString extends CtrlValue {
    protected getDefaultComponent(): TypeComponent {
        return "StringStd";
    }
    protected onInit() {
        super.onInit();
        this.propsMap.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.onChangeValue(event.target.value, event.type);
        };
    }
}
