import {CmdBase} from './CmdBase';
import {DummyItem} from '../DummyItem';
import {UsefulCtrl} from '../../CtrlLibrary/UsefulCtrl';
import {CtrlLibrary} from '../../CtrlLibrary/CtrlLibrary';
import {CmdDeleteDummy} from './CmdDeleteDummy';

export class CmdInsertDummy extends CmdBase {
    private index: number;
    private dummy: DummyItem;
    constructor(dummy: string | DummyItem, index: number = -1) {
        super();
        if (typeof dummy === "string") {
            const usefulCtrl: UsefulCtrl = CtrlLibrary.dict.get(dummy);
            if (!usefulCtrl) {
                throw new Error(`Invalid control type: ${dummy}`);
            }
            this.dummy = new DummyItem(usefulCtrl);
        } else {
            this.dummy = dummy;
        }
        const len: number = this.master.parameters.length;
        this.index = (index < 0 || index >= len) ? len : index;
    }
    createUndo(): CmdBase {
        return new CmdDeleteDummy(this.dummy);
    }

    exec(): void {
        const {parameters} = this.master;
        if (this.index === this.master.parameters.length) {
            // Если индекс равен длине списка параметров, то добавить в конец
            parameters.push(this.dummy);
        } else {
            console.log(`index=${this.index}, length=${this.master.parameters.length}`);
            // Вставка в середину
            this.master.parameters = [...parameters.slice(0, this.index), this.dummy, ...parameters.slice(this.index)];
        }
        // Вставленный элемент становится текущим
        this.master.currentDummy = this.dummy;
    }

    getMessage(): string {
        return `Добавление контрола "${this.dummy.getInfoMessage()}"`;
    }
}