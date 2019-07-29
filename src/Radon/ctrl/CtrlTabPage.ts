/**
 * Страница, входящая в элементе с табуляциями
 * Входит в состав контроллера CtrlTabHost
 *   header - Заголовок, отображаемый в блоке закладок
 *   option - значение, соответствующий value владельца. Каждая страница должна иметь своё значение option
 * Created by Petr_Vinichenko on 26.06.2017.
 */

import {CtrlBlock} from './CtrlBlock';
import {CtrlTabHost} from './CtrlTabHost';
import {Field} from '../types';

export class CtrlTabPage extends CtrlBlock {
    preFocus() {
        // Активировать текущую вкладку
        (this.owner as CtrlTabHost).setValue(this.get(Field.option));
    }
}
