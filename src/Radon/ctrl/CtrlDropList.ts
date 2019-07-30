import {CtrlValue} from './CtrlValue';
import {IDescrCtrl, TypeComponent} from '../descr/IDescrCtrl';
import {TValue} from '../types';

export class CtrlDropList extends CtrlValue {
    protected getDefaultComponent(): TypeComponent {
        return "SelectStd";
    }
    protected onInit(): void {
        super.onInit();
        this.buildList();
        this.propsMap.setValue = (value: string) => {
            this.setValue(value);
        };
    }
    protected buildList(): void {
        this.set('viewOptions', buildList(this.descr));
    }
}

export type DescrOptions = {
    [key: string]: any;
    [index: number]: any;
};

export interface IDescrDropList extends IDescrCtrl {
    options?: DescrOptions;
    optionLabel?: string;
    optionValue?: string;
    emptyLabel?: string;
    emptyValue?: string;
    sort?: string;
}

export interface ISelectOption {
    label: string;
    value: string;
    record: any;
}

type FnOptionCreator = (srcOption: ISelectOption) => (ISelectOption | null);

export const buildList = (descr: IDescrDropList, optionCreator?: FnOptionCreator): ISelectOption[] => {
    const {options} = descr;
    if (!options) {
        throw new Error(`Expected "options" field for controller with name=${descr.name}`);
    }
    optionCreator = optionCreator || ((opt: ISelectOption) => opt);
    const {optionValue = 'value', optionLabel = 'label'} = descr;
    const list: ISelectOption[] = Object.keys(options).map((key: string | number) => {
        const record: any = options[key];
        const field = (name: string): string => {
            if (name === '@') {
                return String(key);
            }
            if (name === '#') {
                return String(record);
            }
            return record[name]; // TODO: _.get(item, name);
        };
        return optionCreator({value: field(optionValue), label: field(optionLabel), record});
    }).filter((value) => value); // Отфильтровать пустые значения
    const {emptyLabel, emptyValue = '', sort} = descr;
    if (sort === 'ASC') {
        list.sort((a, b) => cmp(a.label, b.label));
    } else if (sort === "DESC") {
        list.sort((a, b) => -cmp(a.label, b.label));
    }
    if (emptyLabel != null) {
        list.unshift(optionCreator({value: emptyValue, label: emptyLabel, record: null}));
    }
    return list;
};

const cmp = (a: string | number, b: string | number): number => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
};
