/**
 * Контроллер булевской величины.
 * Типичный вариант отображения - чекбокс.
 */
import {TypeComponent} from "../descr/IDescrCtrl";
import {TValue} from "../types";
import {CtrlValue} from "./CtrlValue";

export class CtrlBoolean extends CtrlValue {
    protected getDefaultComponent(): TypeComponent {
        return "CheckBox";
    }
    protected defaultClassValue(): TValue {
        return false;
    }
    protected onInit() {
        super.onInit();
        this.propsMap.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.onChangeValue(event.target.checked, event.type);
        };
    }
}
