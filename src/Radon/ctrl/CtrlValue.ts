import {CvtBase} from "../converter/CvtBase";
import {CtrlBase} from "../CtrlBase";
import {Field, IStream, TValue} from "../types";
/**
 * Контроллер, который обрабатывает одно простое значение типа TValue
 * Наиболее типичные наследники: CtrlString, CtrlBool, CtrlDropList
 * Данные в потоке сохраняются под именем контроллера.
 * Created by PeterWin on 07.07.2019.
 */

export class CtrlValue extends CtrlBase {
    public load(rawStream: IStream, bConvert?: boolean): void {
        const stream = bConvert ? CvtBase.readList(this.converters, rawStream) : rawStream;
        if (this.name in stream) {
            const value: TValue = (stream[this.name]) as TValue;
            this.setValue(value);
        }
    }
    public save(stream: IStream, bConvert?: boolean): void {
        stream[this.name] = this.getValue();
        if (bConvert) {
            CvtBase.writeList(this.converters, stream);
        }
    }
    public reset(): void {
        this.setValue(this.getDefaultValue());
    }

    public getValue(): TValue {
        return this.get(Field.value);
    }
    public setValue(value: TValue): boolean {
        return this.set(Field.value, value);
    }

    protected getDefaultValue(): TValue {
        return this.get(Field.default, this.defaultClassValue());
    }
    protected defaultClassValue(): TValue {
        return "";
    }

    /**
     * Эта функция вызывается при изменении данных на форме пользователем, когда он, например, вводит текст.
     * Принципиальное отличие от setValue в том, что подобные действия могут учитываться для undo/redo.
     * @param {TValue} value
     */
    protected onChangeValue(value: TValue, eventType: string = "") {
        this.setValue(value);
    }
}
