/**
 * Работает только на сохранение.
 * Исключает из результатов запись, если она содержит пустое значение.
 * Например, если не заполнить поле disabledIf, то при сохранении в потоке не будет записи disabledIf: "".
 */
import {CvtBase} from './CvtBase';
import {IStream} from '../types';

export class CvtExcludeEmpty extends CvtBase {
    public write(stream: IStream): void {
        if (!this.ctrl.name) {
            return;
        }
        const value: any = stream[this.ctrl.name];
        if (value === "" || value === null) {
            delete stream[this.ctrl.name];
        }
    }
}