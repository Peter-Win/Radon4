import {ConMaster} from './ConMaster';
import {UsefulCtrl} from '../CtrlLibrary/UsefulCtrl';
import {IStream} from '../Radon/types';
import {IDescrCtrl} from '../Radon/descr/IDescrCtrl';
import {observable} from 'mobx';
import {FormBase, IFormEvent} from '../Radon/FormBase';
import {IDescrForm} from '../Radon/descr/IDescrForm';

export class DummyItem {
    public readonly key: number;
    public readonly text: string;
    @observable
    private _data: IStream = {};  // Данные в неконвертированном виде
    @observable
    public errMsg: string = "";
    private propsManager: FormBase;
    constructor(private usefulCtrl: UsefulCtrl) {
        this.key = ++sUniqueKey;
        this.text = this.usefulCtrl.getLabel();

        this.propsManager = this.createPropsManager();
        this.propsManager.reset();
        const data = this.propsManager.save({}, false)
        this.data = data;
        console.log('DummyItem.constr.', this, ', data=', data);
    }

    /**
     * Текстовое описание элемента
     * @return {string}
     */
    public getInfoMessage(): string {
        return this.text;
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
        // Надо проверять ошибки у всех, т.к. дублирование имен действует на несколько элементов
        ConMaster.get().parameters.forEach((dummy) => dummy.checkError());
    }
    public get data(): IStream {
        return this._data;
    }
    public buildMeta(): IDescrCtrl[] {
        return this.usefulCtrl.getPropsDescr();
    }
    public getResultMeta(): IDescrCtrl {
        const manager = this.getPropsManager();
        manager.load(this.data, false);
        const meta = manager.save({}, true);
        meta.type = this.usefulCtrl.getType();
        return meta as IDescrCtrl;
    }
    public getResultName(): string {
        return this.data.name;
    }

    /**
     * @deprecated
     * @return {FormBase}
     */
    private createManager(): FormBase {
        const descr = {
            name: "temp",
            ctrls: this.buildMeta(),
        };
        return FormBase.createInstance(descr);
    }
    public checkError() {
        const manager = this.getPropsManager();
        // manager.load(this.data, true);
        manager.forceUpdate();
        const err = manager.getErrors()[0];
        this.errMsg =  err ? err.msg : "";
    }
    public getPropsManager(): FormBase {
        return this.propsManager;
    }
    private createPropsManager(): FormBase {
        const usefulCtrl = this.usefulCtrl;
        const propsFormDescr: IDescrForm = {
            name: "propsOf" + usefulCtrl.name,
            label: usefulCtrl.getLabel(),
            ctrls: [
                {
                    type: 'Block',
                    component: 'PropsTable',
                    label: usefulCtrl.getLabel(),
                    ctrls: this.buildMeta(),
                },
            ],
        };
        const manager: FormBase = FormBase.createInstance(propsFormDescr);
        manager.addEventListener("update", (event: IFormEvent) => {
            const data: IStream = manager.save({}, false);
            if (JSON.stringify(this.data) !== JSON.stringify(data)) {
                // Эта операция приводит к перерисовке. Поэтому её выполняем только при наличии изменений.
                this.data = data;
            }
        });
        manager.onUserChange = ConMaster.onUserCtrlChange;
        return manager;
    }
}
let sUniqueKey: number = 0;