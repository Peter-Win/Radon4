import {CommonComponent} from "./component/CommonComponent";
import {CvtBase} from "./converter/CvtBase";
import {CtrlsOwner} from "./CtrlsOwner";
import {IDescrCtrl, TypeComponent} from "./descr/IDescrCtrl";
import {FormBase} from "./FormBase";
import {Rn} from "./Rn";
import {Field, FieldName, IStream, RnComponent, TFieldValue, TValue} from "./types";
import {IVisitor, VisitorResult} from "./Visitor";
import {IDescrError} from './descr/IDescrError';
import {ValidatorBase} from './validator/ValidatorBase';

export interface IDictCtrls {
    [key: string]: typeof CtrlBase;
}

export interface IParamsCtrl {
    descr: IDescrCtrl;
    form: FormBase;
    owner: CtrlsOwner;
}

export type TChangeDispatcher = (data: IStream) =>  void | null;

/**
 * Базовый класс контроллера.
 * Каждый контроллер способен иметь несколько подчиненных контроллеров и одного хозяина.
 * Для создания контроллера используется статическая функция CtrlBase.createInstance
 * Created by PeterWin on 07.07.2019.
 */
export class CtrlBase extends CtrlsOwner {

    public get name(): string {
        return this.descr.name;
    }
    public static createInstance(params: IParamsCtrl): CtrlBase {
        const {descr: descr0, form} = params;
        const {type} = descr0;
        const Constructor = Rn.dict.ctrls[type];
        if (!Constructor) {
            throw new Error(`Invalid ctrl type: ${type}`);
        }
        const ctrl = new Constructor(params);
        const {descr} = ctrl;
        const {ctrls} = descr;
        ctrl.onInit();
        ctrl._key = CtrlBase.generateUniqueKey("ctrl");
        ctrl.createCtrls(ctrls, form);
        ctrl.converters = (descr.converters || []).map((cvtDescr) => CvtBase.createInstance(cvtDescr, ctrl));
        ctrl.validators = (descr.validators || []).map((vDescr) => ValidatorBase.createInstance(vDescr, ctrl));
        if (descr.disabled) {
            ctrl.lockCounter++;
        }
        return ctrl as CtrlBase;
    }
    public static generateUniqueKey(prefix: string = "key"): string {
        return `${prefix}${staticUniqueIndex++}`;
    }
    public form: FormBase;

    public readonly descr: IDescrCtrl;

    /**
     * Callback-функция, которая вызывается для перерисовки компонента
     */
    public dispatchChanges: TChangeDispatcher = null;
    protected converters: CvtBase[];
    protected validators: ValidatorBase[];
    protected propsMap: IPropsMap = {};
    private _key: string;
    private lockCounter: number = 0;
    private bDisabled: boolean = false;
    private modified: IStream | null = null;

    protected constructor(params: IParamsCtrl) {
        super();
        this.descr = this.transformDescr(params.descr);
        this.form = params.form;
        this.owner = params.owner;
    }
    public getKey(): string {
        return this._key;
    }
    public get key(): string {
        return this._key;
    }

    public load(stream: IStream, bConvert?: boolean): void {
    }
    public save(stream: IStream, bConvert?: boolean): void {
    }

    /**
     * Позволяет извлечь значение контроллера.
     * По-умолчанию извлекает конвертированное значение,
     * в отличие от CtrlValue.getValue, которая возвращает всегда сырое.
     * Обычно не требует переопределения
     * @param {boolean} bConvert Требуется ли конвертация значения
     * @return {TValue}
     */
    public val(bConvert: boolean = true): TValue | IStream {
        const stream: IStream = {} as IStream;
        this.save(stream, bConvert);
        const values = Object.values(stream);
        if (values.length === 1) {
            return values[0];
        }
        return stream;
    }
    public reset(): void {
    }
    public onUpdate() {
    }
    public postUpdate() {
    }

    public get(field: FieldName, defaultValue: TFieldValue = null): TFieldValue {
        return (field in this.descr) ? this.descr[field] : defaultValue;
    }

    /**
     * Изменение свойств может привести к перерисовке.
     * В случае, если новое значение отличается от старого, то сначала оно фиксируется как modified.
     * А потом всё, что попало в modified, будет перерисовано в visualUpdate()
     * @param {FieldName} field
     * @param {TFieldValue} value
     * @return {boolean}
     */
    public set(field: FieldName, value: TFieldValue): boolean {
        const bNeedUpdate: boolean = !this.isEqual(field, value);
        if (bNeedUpdate) {
            this.descr[field] = value;
            this.modified = this.modified || ({} as IStream);
            this.modified[field] = value;
            this.update();
        }
        return bNeedUpdate;
    }

    /**
     * Эта функция вызывается только из FormBase.forceUpdate.
     * Если контроллер имеет изменения, то будет перерисован соответствующий компонент
     */
    public visualUpdate() {
        if (this.modified) {
            // Выполнить обновление внешнего вида компонент
            const dispatchChanges = this.dispatchChanges;
            // console.log(`CtrlBase[${this.name}].visualUpdate ${JSON.stringify(this.modified)}`);
            if (dispatchChanges) {
                dispatchChanges(this.modified);
            }
            this.modified = null;
        }
    }
    public isEqual(field: FieldName, value: TFieldValue): boolean {
        return this.get(field) === value;
    }
    public walk(visitor: IVisitor): VisitorResult {
        const {ctrlBegin, ctrlEnd} = visitor;
        const {ctrls} = this;
        let result: VisitorResult = ctrlBegin && ctrlBegin(this);
        let i = 0;
        while (!result && i < ctrls.length) {
            result = ctrls[i].walk(visitor);
            i++;
        }
        return result || (ctrlEnd && ctrlEnd(this));
    }
    public createComponent(): RnComponent {
        const componentDescr = this.descr.component || this.getDefaultComponent();
        let Component: RnComponent = null;
        if (typeof componentDescr === "string") {
            Component = Rn.dict.components[componentDescr];
            if (!Component) {
                throw new Error(`Invalid component "${componentDescr}"`);
            }
        } else {
            Component = componentDescr as RnComponent;
        }
        return Component;
    }

    /**
     * Чтобы компоненты могли сообщить своим контроллерам о каких-то изменениях, они вызывают колбэки,
     * которые регистрируются в propsMap.
     * Список нельзя менять. Он статический.
     * @return {Object}
     */
    public getPropsMap(): object {
        return this.propsMap;
    }

    public isDisabled(): boolean {
        return this.lockCounter !== 0;
    }

    /**
     * Это внешняя функция, которая лочит контроллер без учёта его состояния
     * @param {number} step
     */
    public lock(step: number = 1): void {
        this.lockCounter += step;
        // Возможно, потребуется перерисовка
        this.set(Field.disabled, this.lockCounter !== 0);
    }

    /**
     * Это внутренняя функция, которая позволяет сколько угодно раз разрешать или запрещать контроллер без вложенности.
     * Например, можно 1000 раз вызвать enable(true), но достаточно один раз вызвать enable(false), чтобы залочить
     * @param {boolean} bEnabled
     */
    public enable(bEnabled = true) {
        if (bEnabled) {
            if (this.bDisabled) {
                this.bDisabled = false;
                this.lock(-1);
            }
        } else {
            if (!this.bDisabled) {
                this.bDisabled = true;
                this.lock(1);
            }
        }
    }

    public show(bVisible: boolean = true) {
        this.set(Field.hidden, !bVisible);
    }
    public hide() {
        this.show(false);
    }
    public isVisible(): boolean {
        return !this.get(Field.hidden, false);
    }

    /**
     * метод переопределяется в специальных контролах типа CtrlInteger, в которых требуется лишь модификация описания
     * @param {IDescrCtrl} descr
     * @return {IDescrCtrl}
     */
    protected transformDescr(descr: IDescrCtrl): IDescrCtrl {
        return {...descr};
    }
    protected onInit(): void {
    }

    protected update(): void {
        this.form.update();
    }

    protected getDefaultComponent(): TypeComponent {
        return CommonComponent;
    }

    public clearError(): void {
        this.setError({msg: ""});
    }
    public getErrorMessage(): string {
        return this.get(Field.errMsg, "") as string;
    }
    public setError(err: IDescrError): void {
        this.set(Field.errMsg, err.msg);
    }

    /**
     * Если контроллер невидим, то эта функция для него не вызывается
     * @param {IDescrError[]} errors
     */
    public check(errors: IDescrError[]): void {
        // Вызываются валидаторы по порядку. Если очередной даёт ошибку, остальные не проверяются.
        for (let validator of this.validators) {
            const msg = validator.check();
            if (msg) {
                errors.push(validator.createErrorInfo(msg));
            }
        }
    }
}
interface IPropsMap {
    [key: string]: any;
}

let staticUniqueIndex: number = 0;
