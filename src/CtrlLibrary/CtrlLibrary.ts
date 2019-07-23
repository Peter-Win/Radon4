import {UsefulCtrl} from './UsefulCtrl';
import {readCtrlLibrary} from './readCtrlLibrary';
import {descrAllUseful} from './descr';
import {registerRnEntities} from './registerRnEntities';

export class CtrlLibrary {
    public static init() {
        if (CtrlLibrary.bInit) {
            return;
        }
        CtrlLibrary.bInit = true;
        registerRnEntities();
        CtrlLibrary.list = readCtrlLibrary(descrAllUseful);
        CtrlLibrary.list.forEach((uc) => CtrlLibrary.dict.set(uc.name, uc));
    }
    public static list: UsefulCtrl[];
    public static dict: Map<string, UsefulCtrl> = new Map();
    private static bInit: boolean = false;
}
