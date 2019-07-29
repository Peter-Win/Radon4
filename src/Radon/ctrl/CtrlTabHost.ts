/**
 * Контроллер, управляющий переключением Tab-страниц
 * Одна из страниц активна. Для остальных видны лишь заголовки.
 * Значение контроллера определяет, какая страница активна.
 * Подчинённые контроллеры должны иметь тип CtrlTabPage. Их поле option соответствует value хоста.
 * Created by Petr_Vinichenko on 26.06.2017.
 */
import {CtrlValue} from './CtrlValue';
import {TypeComponent} from '../descr/IDescrCtrl';
import {Field, IStream} from '../types';
import {CtrlBase} from '../CtrlBase';

export class CtrlTabHost extends CtrlValue {
    protected getDefaultComponent(): TypeComponent {
        return "TabHost";
    }
    public load(rawStream: IStream, bConvert?: boolean): void {
        super.load(rawStream, bConvert);
        this.loadItems(rawStream, bConvert);
    }
    public save(stream: IStream, bConvert?: boolean): void {
        super.save(stream, bConvert);
        this.saveItems(stream, bConvert);
    }
    protected onInit() {
        super.onInit();
        this.propsMap.onActivate = (ctrl: CtrlBase) => {
            this.setValue(ctrl.get(Field.option));
        };
    }
}
