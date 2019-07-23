import {observable, computed} from "mobx";
import {DummyItem} from './DummyItem';
import {IDescrCtrl} from '../Radon/descr/IDescrCtrl';

export class ConMaster {
    public static get(): ConMaster {
        return ConMaster.staticInstance;
    }
    @observable parameters: DummyItem[] = [];
    @observable currentDummy: DummyItem | null = null;
    constructor() {
        ConMaster.staticInstance = this;
    }
    private static staticInstance: ConMaster;

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
}
