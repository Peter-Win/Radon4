import {CtrlBase} from "../CtrlBase";
import {Field, IStream, TValue} from "../types";
/**
 * Контроллер, который обрабатывает одно простое значение типа TValue
 * Наиболее типичные наследники: CtrlString, CtrlBool, CtrlDropList
 * Данные в потоке сохраняются под именем контроллера.
 * Created by PeterWin on 07.07.2019.
 */

export class CtrlValue extends CtrlBase {
    public load(stream: IStream, bConvert?: boolean): void {
        const value: TValue = (stream[this.name]) as TValue;
        this.setValue(value);
    }

    public save(stream: IStream, bConvert?: boolean): void {
        stream[this.name] = this.getValue();
    }

    public getValue(): TValue {
        return this.get(Field.value);
    }
    public setValue(value: TValue): boolean {
        return this.set(Field.value, value);
    }
}
