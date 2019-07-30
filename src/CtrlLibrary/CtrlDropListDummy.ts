/**
 * Необходимо модифицировать контроллер выпадающего списка,
 * чтобы он не крашился в момент редактирования списка опций.
 */
import {CtrlDropList} from '../Radon/ctrl/CtrlDropList';
import {IDescrCtrl} from '../Radon/descr/IDescrCtrl';

export class CtrlDropListDummy extends CtrlDropList {
    protected transformDescr(descr: IDescrCtrl): IDescrCtrl {
        const result = {...descr};
        try {
            JSON.parse(result.options);
        } catch (e) {
            result.options = [];
        }
        return result;
    }
}
