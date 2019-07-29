import {CmdBase} from './CmdBase';
import {ConMaster} from '../ConMaster';

export class CmdMoveDummy extends CmdBase {
    /**
     *
     * @param {number} oldPos
     * @param {number} newPos
     * @param {boolean} already true для операций drag-n-drop, когда действие уже реально выполнено.
     */
    constructor(private oldPos: number, private newPos: number, private already: boolean = false) {
        super();
    }
    createUndo(): CmdBase {
        return new CmdMoveDummy(this.newPos, this.oldPos);
    }

    exec(): void {
        if (!this.already) {
            this.master.moveDummies(this.oldPos, this.newPos);
        }
    }

    getMessage(): string {
        return "Изменение позиции параметра";
    }
}

