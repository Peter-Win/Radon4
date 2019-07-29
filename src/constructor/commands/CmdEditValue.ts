import {CmdBase} from './CmdBase';
import {Field, TValue} from '../../Radon/types';
import {CtrlValue} from '../../Radon/ctrl/CtrlValue';

export class CmdEditValue extends CmdBase {
    constructor(
        private ctrl: CtrlValue,
        private oldValue: TValue,
        private newValue: TValue,
        private already: boolean = false
    ) {
        super();
    }
    createUndo(): CmdBase {
        return new CmdEditValue(this.ctrl, this.newValue, this.oldValue);
    }

    exec(): void {
        if (!this.already) {
            this.ctrl.setValue(this.newValue);
        }
    }

    getMessage(): string {
        return `Редактирование поля ${this.ctrl.get(Field.label)}`;
    }

}