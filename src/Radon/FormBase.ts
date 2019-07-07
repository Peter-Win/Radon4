import {CtrlsOwner} from "./CtrlsOwner";
import {IDescrForm} from "./IDescrForm";
import {IStream} from "./types";

export interface IDictForms {
    [key: string]: typeof FormBase;
}

/**
 * Менеджер формы.
 * Базовый класс, который не требует переопределения
 * Не создаётся в явном виде, т.к. это автоматически выполняет компонент RnForm
 * Created by PeterWin on 07.07.2019.
 */
export class FormBase extends CtrlsOwner {
    public static createInstance(descr: IDescrForm): FormBase {
        // TODO: Заменить на фабрику классов
        return new FormBase(descr);
    }

    protected readonly descr: IDescrForm;

    protected constructor(descr: IDescrForm) {
        super();
        this.descr = descr;
    }

    public get name(): string {
        return this.descr.name;
    }

    public load(stream: IStream, bConvert?: boolean): void {
        this.loadItems(stream, bConvert);
    }
    public save(stream?: IStream, bConvert?: boolean): IStream {
        return this.saveItems(stream, bConvert);
    }
}
