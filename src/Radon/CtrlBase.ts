import {CtrlsOwner} from "./CtrlsOwner";
import {IDescrCtrl, TypeComponent} from './descr/IDescrCtrl';
import {FormBase} from "./FormBase";
import {Rn} from "./Rn";
import {Field, FieldName, IStream, RnComponent, TFieldValue, TValue} from './types';
import {IVisitor, VisitorResult} from "./Visitor";
import {CommonComponent} from './component/CommonComponent';
import {CvtBase} from './converter/CvtBase';

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
        const {descr, form} = params;
        const {type, ctrls} = descr;
        const Constructor = Rn.dict.ctrls[type];
        const ctrl = new Constructor(params);
        ctrl.key = CtrlBase.generateUniqueKey("ctrl");
        ctrl.createCtrls(ctrls, form);
        ctrl.converters = (descr.converters || []).map((cvtDescr) => CvtBase.createInstance(cvtDescr, ctrl));
        if (descr.disabled) {
            ctrl.lockCounter++;
        }
        ctrl.onInit();
        return ctrl as CtrlBase;
    }
    private key: string;
    private lockCounter: number = 0;
    private bDisabled: boolean = false;
    protected converters: CvtBase[];
    public getKey(): string {
        return this.key;
    }
    public static generateUniqueKey(prefix: string = "key"): string {
        return `${prefix}${staticUniqueIndex++}`;
    }
    public form: FormBase;

    public readonly descr: IDescrCtrl;

    protected constructor(params: IParamsCtrl) {
        super();
        this.descr = {...params.descr};
        this.form = params.form;
        this.owner = params.owner;
    }
    protected onInit(): void {
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
    private modified: IStream | null = null;

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

    /**
     * Callback-функция, которая вызывается для перерисовки компонента
     */
    public dispatchChanges: TChangeDispatcher = null;

    protected update(): void {
        this.form.update();
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

    protected getDefaultComponent(): TypeComponent {
        return CommonComponent;
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
    protected propsMap: IPropsMap = {};

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
}
interface IPropsMap {
    [key: string]: any;
}

let staticUniqueIndex: number = 0;
