import {CtrlValue} from "./ctrl/CtrlValue";
import {CtrlsOwner} from "./CtrlsOwner";
import {IDescrCtrl} from "./descr/IDescrCtrl";
import {Rn} from "./Rn";
import {FieldName, IStream, TFieldValue} from "./types";

export interface IDictCtrls {
    [key: string]: typeof CtrlValue;
}

/**
 * Базовый класс контроллера.
 * Каждый контроллер способен иметь несколько подчиненных контроллеров и одного хозяина.
 * Created by PeterWin on 07.07.2019.
 */
export abstract class CtrlBase extends CtrlsOwner {
    public static createInstance(descr: IDescrCtrl): CtrlBase {
        const {type} = descr;
        const Constructor = Rn.dict.ctrls[type];
        const ctrl = new Constructor(descr);
        return ctrl as CtrlBase;
    }
    protected readonly descr: IDescrCtrl;
    protected constructor(descr: IDescrCtrl) {
        super();
        this.descr = descr;
    }

    public get name(): string {
        return this.descr.name;
    }

    public abstract load(stream: IStream, bConvert?: boolean): void;
    public abstract save(stream: IStream, bConvert?: boolean): void;

    public get(field: FieldName): TFieldValue {
        return this.descr[field];
    }
    public set(field: FieldName, value: TFieldValue): boolean {
        const bNeedUpdate: boolean = this.isEqual(field, value);
        if (bNeedUpdate) {
            this.descr[field] = value;
        }
        return bNeedUpdate;
    }
    public isEqual(field: FieldName, value: TFieldValue): boolean {
        return this.get(field) === value;
    }
}
