import {ConMaster} from './ConMaster';
import {UsefulCtrl} from '../CtrlLibrary/UsefulCtrl';
import {IStream} from '../Radon/types';
import {IDescrCtrl} from '../Radon/descr/IDescrCtrl';
import {observable} from 'mobx';
import {FormBase} from '../Radon/FormBase';

export class DummyItem {
    public readonly key: number;
    public readonly text: string;
    @observable
    private _data: IStream = {};  // Данные в неконвертированном виде
    @observable
    public errMsg: string = "";
    constructor(private usefulCtrl: UsefulCtrl) {
        this.key = ++sUniqueKey;
        this.text = this.usefulCtrl.getLabel();
        const manager: FormBase = this.createManager();
        manager.reset();
        this.data = manager.save({}, false);
        console.log('DummyItem.constructor. data=', this.data);
    }
    public isCurrent(): boolean {
        return this === ConMaster.get().currentDummy;
    }
    public activate() {
        ConMaster.get().setCurrentDummy(this);
    }
    public getIndex(): number {
        return ConMaster.get().parameters.findIndex((item) => item === this);
    }
    public getUsefulCtrl(): UsefulCtrl {
        return this.usefulCtrl;
    }
    public set data(data:IStream) {
        this._data = data;
        this.checkError();
    }
    public get data(): IStream {
        return this._data;
    }
    public buildMeta(): IDescrCtrl[] {
        return this.usefulCtrl.getPropsDescr();
    }
    public getResultMeta(): IDescrCtrl {
        const manager = this.createManager();
        manager.load(this.data, false);
        const meta = manager.save({}, true);
        meta.type = this.usefulCtrl.getType();
        return meta as IDescrCtrl;
    }
    private createManager(): FormBase {
        const descr = {
            name: "temp",
            ctrls: this.buildMeta(),
        };
        return FormBase.createInstance(descr);
    }
    private checkError(manager?: FormBase) {
        manager = manager || this.createManager();
        manager.load(this.data, true);
        manager.forceUpdate();
        const err = manager.getErrors()[0];
        this.errMsg =  err ? err.msg : "";
    }
}
let sUniqueKey: number = 0;