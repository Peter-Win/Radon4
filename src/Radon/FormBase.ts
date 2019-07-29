import {CtrlBase} from "./CtrlBase";
import {CtrlsOwner} from "./CtrlsOwner";
import {IDescrForm} from "./descr/IDescrForm";
import {Rn} from "./Rn";
import {Field, IStream} from "./types";
import {IVisitor, VisitorResult} from "./Visitor";
import {IDescrError} from './descr/IDescrError';

export interface IDictForms {
    [key: string]: typeof FormBase;
}

export type TFormEventType = "update" | "submit" | "reset";

export interface IFormEvent {
    type: TFormEventType;
    source?: CtrlBase;
}

export type TFormEventListener = (event: IFormEvent) => void;

/**
 * Менеджер формы.
 * Базовый класс, который не требует переопределения
 * Не создаётся в явном виде, т.к. это автоматически выполняет компонент RnForm
 * Created by PeterWin on 07.07.2019.
 */
export class FormBase extends CtrlsOwner {

    public get name(): string {
        return this.descr.name;
    }
    public static createInstance(descr: IDescrForm): FormBase {
        const {type = "Base"} = descr;
        const Constructor = Rn.dict.forms[type];
        const form: FormBase = new Constructor(descr);
        form.createCtrls(descr.ctrls, form);
        return form;
    }
    public bDead: boolean = false;

    public readonly descr: IDescrForm;
    private lockCounter: number = 0;

    private updateCounter: number = 0;
    private queueSize: number = 0;

    private subscribers: Map<TFormEventType, Set<TFormEventListener>> = new Map();
    private errors: IDescrError[] = [];
    public focusRequest: CtrlBase | null = null;

    protected constructor(descr: IDescrForm) {
        super();
        this.descr = descr;
    }

    public load(stream: IStream, bConvert?: boolean): void {
        this.loadItems(stream, bConvert);
    }

    public save(stream?: IStream, bConvert?: boolean): IStream {
        return this.saveItems(stream, bConvert);
    }

    /**
     * Обход.
     * Чтобы обход выполнился полностью, все функции визитора должны возвращать false
     * Если кто-то вернет положительный ответ, это значит что поиск окончен.
     * @param {IVisitor} visitor
     * @return {any} Если кто-то возвращает результат, отличающийся от falsy, то выполнение прекращается
     */
    public walk(visitor: IVisitor): VisitorResult {
        const {formBegin, formEnd} = visitor;
        let result: VisitorResult = formBegin && formBegin(this);
        let i = 0;
        const {ctrls} = this;
        while (!result && i < ctrls.length) {
            result = ctrls[i].walk(visitor);
            i++;
        }
        return result || (formEnd && formEnd(this));
    }

    public update(): void {
        if (this.bDead) {
            console.log("Call update for dead form!!!");
            return;
        }
        if (this.queueSize === 10) {
            console.log("Проблемный вызов FormBase.update");
        }

        if (!this.updateCounter) {
            setTimeout(() => this.forceUpdate(), 1);
        }
        this.updateCounter += 1;
    }

    public onUpdate() {
    }

    public postUpdate() {
    }

    /**
     * Через эту функцию внешние пользователи могут узнавать о событиях внутри формы
     * @param {TFormEventType} type
     * @param {TFormEventListener} listener
     */
    public addEventListener(type: TFormEventType, listener: TFormEventListener) {
        let part = this.subscribers.get(type);
        if (!part) {
            part = new Set<TFormEventListener>();
            this.subscribers.set(type, part);
        }
        part.add(listener);
    }

    public removeEventListener(type: TFormEventType, listener: TFormEventListener) {
        const part = this.subscribers.get(type);
        if (part) {
            part.delete(listener);
        }
    }

    public lock(step: number = 1) {
        this.lockCounter += step;
        this.walk({
            ctrlBegin: (ctrl: CtrlBase) => ctrl.lock(step),
        });
    }

    public unlock(force: boolean = false) {
        this.lock(force ? -this.lockCounter : -1);
    }

    public findAutoFocus(): CtrlBase | null {
        const result: VisitorResult = this.walk({
            ctrlBegin: (ctrl) => ctrl.get(Field.autofocus) ? ctrl : false,
        });
        return result ? result as CtrlBase : null;
    }
    public focus(): void {
        const ctrlAF = this.findAutoFocus();
        if (ctrlAF) {
            ctrlAF.focus();
        }
    }

    public onSubmit(): boolean {
        this.onEvent({
            type: "submit",
        });
        return false;
    }

    public onReset(): boolean {
        console.log("FormBase.onReset");
        this.walk({
            ctrlBegin: (ctrl) => ctrl.reset(),
        });
        this.onEvent({
            type: "reset",
        });
        return false;
    }

    public findCtrlByName(name: string): CtrlBase | null {
        // TODO: Пока не оптимальный вариант, без использования кеша
        const result: VisitorResult = this.walk({
            ctrlBegin: (ctrl: CtrlBase): any => ctrl.name === name ? ctrl : null,
        });
        return result ? result as CtrlBase : null;
    }

    protected onEvent(event: IFormEvent) {
        const part = this.subscribers.get(event.type);
        if (part) {
            Array.from(part).forEach((listener: TFormEventListener) => {
                listener(event);
            });
        }
    }

    protected calcExpr(expr: string | TExpressionFunc, source: CtrlBase): any {
        if (typeof expr === "function") {
            return expr(source);
        }
        // Пока очень простой вариант
        let sExpr: string = expr;
        let bInverse = false;
        if (sExpr[0] === "!") {
            bInverse = true;
            sExpr = sExpr.slice(1);
        }
        const ctrlName: string = sExpr;
        const ctrl: CtrlBase = this.findCtrlByName(ctrlName);
        let result: any;
        if (ctrl) {
            result = ctrl.val();
        }
        if (bInverse) {
            result = !result;
        }
        return result;
    }

    public forceUpdate(): void {
        if (this.queueSize > 10) {
            console.warn("Достигнут предел вложенности FormBase.forceUpdate");
            this.queueSize = 0;
            return;
        }
        this.updateCounter = 0;
        this.errors.length = 0;
        // Сначала вызвать onUpdate для всех контроллеров
        this.walk({
            ctrlBegin: (ctrl: CtrlBase) => {
                ctrl.onUpdate();
                // Если у контроллера есть условие видимости
                const conditionVisible = ctrl.get(Field.visibleIf);
                if (conditionVisible) {
                    const conditionVisibleValue = this.calcExpr(conditionVisible, ctrl);
                    ctrl.show(!!conditionVisibleValue);
                }
                const conditionDisabled = ctrl.get(Field.disabledIf);
                if (conditionDisabled) {
                    ctrl.enable(!this.calcExpr(conditionDisabled, ctrl));
                }
            },
        });
        this.onUpdate();
        const wrongs: Set<CtrlBase> = new Set();
        // Теперь проверка ошибок
        this.walk({
            ctrlBegin: (ctrl) => {
                if (ctrl.getErrorMessage()) {
                    wrongs.add(ctrl);
                }
                if (ctrl.isVisible()) {
                    ctrl.check(this.errors);
                }
            },
        });
        // Теперь передать полученные ошибки их владельцам
        this.errors.reverse().forEach((err: IDescrError) => {
            const ctrl: CtrlBase = err.owner;
            if (ctrl) {
                ctrl.setError(err);
                wrongs.delete(ctrl);
            }
        });
        Array.from(wrongs).forEach((ctrl) => ctrl.clearError());
        // Вызов postUpdate, главной целью которого является отображение информации об ошибках
        this.walk({
            ctrlEnd: (ctrl) => ctrl.postUpdate(),
        });
        this.postUpdate();

        this.walk({
            ctrlEnd: (ctrl: CtrlBase) => {
                ctrl.visualUpdate();
            },
        });
        this.onEvent({
            type: "update",
        });
    }
    public getErrors(): IDescrError[] {
        return this.errors;
    }
    public onUserChange = (ctrl: CtrlBase, make: ()=>void) => {
        make();
    };
}

type TExpressionFunc = (source: CtrlBase) => any;
