/**
 * Блок линейно группирует несколько подчиненных контроллеров.
 * Причем, это не влияет на структуру данных.
 * То есть, блок используется только в целях управления расположением компонентов формы.
 */
import {CtrlBase} from '../CtrlBase';
import {IStream} from '../types';
import {TypeComponent} from '../descr/IDescrCtrl';

export class CtrlBlock extends CtrlBase {
    public load(stream: IStream, bConvert?: boolean): void {
        this.loadItems(stream, bConvert);
    }
    public save(stream: IStream, bConvert?: boolean): void {
        this.saveItems(stream, bConvert);
    }
    public getDefaultComponent(): TypeComponent {
        return "BlockStd";
    }
}