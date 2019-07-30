import {CtrlBase} from "./CtrlBase";
import {IDescrCtrl} from "./descr/IDescrCtrl";
import {FormBase} from "./FormBase";
import {IStream} from "./types";
/**
 * Контейнер контроллеров.
 * Является общим предком для CtrlBase и FormBase
 * Created by PeterWin on 07.07.2019.
 */

export class CtrlsOwner {
    public owner: CtrlsOwner | null = null;
    public ctrls: CtrlBase[] = [];

    public loadItems(stream: IStream, bConvert?: boolean): void {
        this.ctrls.forEach((ctrl) => ctrl.load(stream, bConvert));
    }
    public saveItems(stream?: IStream, bConvert?: boolean): IStream {
        return this.ctrls.reduce((resultStream, ctrl) => {
            ctrl.save(resultStream, bConvert);
            return resultStream;
        }, stream || {});
    }
    public reset(): void {
        // this.ctrls.forEach((ctrl) => ctrl.reset());
    }
    protected createCtrls(descrList: IDescrCtrl[] | null, form: FormBase) {
        if (descrList) {
            descrList.forEach((descr) => this.ctrls.push(CtrlBase.createInstance({
                descr,
                form,
                owner: this,
            })));
        }
    }
    /**
     * Подготовка к фокусу подчиненного элемента.
     * Переопределяется в потомках.
     * Может переопределяться вкладками или свёрнутыми элементами, чтобы показать невидимый элемент
     * @param focusedCtrl
     */
    public preFocus(focusedCtrl: CtrlBase) {
    }

}
