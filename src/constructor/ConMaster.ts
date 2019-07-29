import {observable, computed} from "mobx";
import {DummyItem} from './DummyItem';
import {IDescrCtrl} from '../Radon/descr/IDescrCtrl';
import {IStream, TValue} from '../Radon/types';
import {CtrlLibrary} from '../CtrlLibrary/CtrlLibrary';
import {CmdBase} from './commands/CmdBase';
import {CtrlBase} from '../Radon/CtrlBase';
import {CtrlValue} from '../Radon/ctrl/CtrlValue';
import {CmdEditValue} from './commands/CmdEditValue';

export class ConMaster {
    public static get(): ConMaster {
        return ConMaster.staticInstance;
    }
    // Параметры для функции
    @observable parameters: DummyItem[] = [];
    // Отладочные значения параметров.
    // Если сделать observable, то при вводе в строке происходит перерисовка после каждого символа
    // И сбрасывается положение курсора.
    demoData: IStream = {};
    @observable currentDummy: DummyItem | null = null;
    constructor() {
        ConMaster.staticInstance = this;
    }
    private static staticInstance: ConMaster;

    @observable
    public undoList: CmdBase[] = [];
    @observable
    public redoList: CmdBase[] = [];
    public execCommand(cmd: CmdBase) {
        this.redoList.length = 0;
        this.undoList.push(cmd.createUndo());
        cmd.exec();
    }
    public execUndo() {
        if (this.undoList.length > 0) {
            const cmd: CmdBase = this.undoList.pop();
            this.redoList.push(cmd.createUndo());
            cmd.exec();
        }
    }
    public execRedo() {
        if (this.redoList.length > 0) {
            const cmd: CmdBase = this.redoList.pop();
            this.undoList.push(cmd.createUndo());
            cmd.exec();
        }
    }
    @computed
    public get isUndoPossible(): boolean {
        return this.undoList.length > 0;
    }
    @computed
    public get isRedoPossible(): boolean {
        return this.redoList.length > 0;
    }
    protected resetCommands() {
        this.undoList.length = 0;
        this.redoList.length = 0;
    }

    public setCurrentDummy(dummy: DummyItem | null): void {
        this.currentDummy = dummy;
    }
    public moveDummies(dragIndex: number, hoverIndex: number): void {
        // Удалить перемещаемый элемент
        const [dragDummy] = this.parameters.splice(dragIndex, 1);
        this.parameters = [...this.parameters.slice(0, hoverIndex), dragDummy, ...this.parameters.slice(hoverIndex)];
    }
    @computed
    public get resultMetaData(): IDescrCtrl[] {
        return this.parameters.map((dummy: DummyItem) => dummy.getResultMeta());
    }
    @computed
    public get errorsCount() {
        return this.parameters.reduce((sum, dummy) => sum + (dummy.errMsg ? 1 : 0), 0);
    }

    /**
     * Переход к следующему или предыдущему элементу при помлщи клавиш
     * @param {number} step 1=следующий, -1=предыдущий
     */
    public selectNextDummy(step: number): boolean {
        console.log('selectNextDummy ', step);
        const list: DummyItem[] = this.parameters;
        const curIndex: number = this.getCurrentDummyIndex();
        if (curIndex >= 0) {
            const nextIndex = curIndex + step;
            if (nextIndex >= 0 && nextIndex < list.length) {
                this.currentDummy = list[nextIndex];
                console.log('next = ', nextIndex);
                return true;
            }
        }
        return false;
    }
    public getCurrentDummyIndex(): number {
        return this.parameters.findIndex((dummy) => dummy === this.currentDummy);
    }

    /////////// save / load subsystem

    public load(): void {
        try {
            this.resetCommands();
            const text: string = localStorage.getItem("parameters");
            const info = JSON.parse(text) as IStorageFormat;
            console.log('Loaded', info);
            this.demoData = info.data;
            this.parameters = (info.meta).map((descr: IDescrCtrl) => {
                const usefulCtrl = CtrlLibrary.dict.get(descr.type);
                const dummy: DummyItem = new DummyItem(usefulCtrl);
                // dummy.data = descr;
                dummy.getPropsManager().load(descr);
                return dummy;
            });
        } catch (e) {
            console.error(e);
            alert('Cant load: ' + e.message);
        }
    }
    public save(): void {
        const result: IStorageFormat = {
            meta: this.resultMetaData,
            data: this.demoData,
        };
        console.log('Saved data:', JSON.stringify(result));
        try {
            localStorage.setItem('parameters', JSON.stringify(result));
        } catch (e) {
            console.error(e);
            alert("Cant save: " + e.message);
        }
    }
    public static onUserCtrlChange = (ctrl: CtrlBase, make: () => void) => {
        if (ctrl instanceof CtrlValue) {
            const oldValue: TValue = ctrl.getValue();
            make();
            const newValue: TValue = ctrl.getValue();
            ConMaster.get().execCommand(new CmdEditValue(ctrl, oldValue, newValue));
        } else {
            throw new Error('Unrecognized control type: ' + ctrl.get('type'));
        }
        make();
    };

    public currentPart: "board" | "props" | "" = "";
}

interface IStorageFormat {
    meta: IDescrCtrl[];
    data: IStream;
}
