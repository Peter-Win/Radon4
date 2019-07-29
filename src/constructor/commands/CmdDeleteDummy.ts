import {CmdBase} from './CmdBase';
import {DummyItem} from '../DummyItem';
import {CmdInsertDummy} from './CmdInsertDummy';

export class CmdDeleteDummy extends CmdBase {
    public constructor(private dummy: DummyItem) {
        super();
    }
    createUndo(): CmdBase {
        return new CmdInsertDummy(this.dummy, this.getIndex());
    }

    exec(): void {
        this.master.parameters.splice(this.getIndex(), 1);
        if (this.master.currentDummy === this.dummy) {
            // Если удаляемый элемент является текущим, то очистить текущий
            this.master.currentDummy = null;
        }
    }
    protected getIndex(): number {
        return this.master.parameters.findIndex((item) => item === this.dummy);
    }

    getMessage(): string {
        return `Удаление элемента № ${this.getIndex() + 1}: ${this.dummy.getInfoMessage()}`;
    }

}