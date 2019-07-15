/**
 * Конвертер отвечает за формат данных.
 * Потому что формат данных модели может отличаться от того, который импользует контроллер.
 * Наиболее типичные примеры: числа и даты.
 * Обработка происходит на уровне потока, а не отдельных значений.
 * Потому что контроллер может оперировать произвольным числом значений.
 */
import {IStream} from '../types';
import {CtrlBase} from '../CtrlBase';
import {IDescrConverter} from '../descr/IDescrConverter';
import {Rn} from '../Rn';
import {TDescrConverterExt} from '../descr/IDescrCtrl';

export interface IDictConverters {
    [key: string]: typeof CvtBase;
}

export class CvtBase {
    public static createInstance(descrExt: TDescrConverterExt, ctrl: CtrlBase): CvtBase {
        let descr;
        if (typeof descrExt === 'string') {
            descr = {type: descrExt};
        } else {
            descr = descrExt
        }
        const Constructor = Rn.dict.converters[descr.type];
        const converter: CvtBase = new Constructor(descr, ctrl);
        return converter;
    }
    public static readList(list: CvtBase[], stream: IStream): IStream {
        return list.reduce((acc: IStream, converter: CvtBase) => converter.read(acc), stream);
    }
    public static writeList(list: CvtBase[], stream: IStream): void {
        // В обратном порядке
        list.reverse().forEach((c: CvtBase) => c.write(stream));
    }
    protected readonly ctrl: CtrlBase;
    protected descr: IDescrConverter;
    protected constructor(descr: IDescrConverter, ctrl: CtrlBase) {
        this.descr = descr;
        this.ctrl = ctrl;
    }
    protected get name() {
        return this.ctrl.name;
    }
    public read(stream: IStream): IStream {
        return stream;
    }
    public write(stream: IStream): void {}
}
