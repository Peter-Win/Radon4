import {CtrlValue} from "./CtrlValue";
import {StringStd} from '../component/StringStd'
import {TypeComponent} from '../descr/IDescrCtrl';

export class CtrlString extends CtrlValue {
    getDefaultComponent(): TypeComponent {
        return "StringStd";
    }
    protected onInit() {
        super.onInit();
        this.propsMap.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.onChangeValue(event.target.value, event.type);
        }
    }
}
