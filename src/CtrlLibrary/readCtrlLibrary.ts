import {IDescrUsefulCtrl} from "./IDescrUsefulCtrl";
import {UsefulCtrl} from './UsefulCtrl';
import {IDescrCtrl} from '../Radon/descr/IDescrCtrl';
import {CtrlLibrary} from './CtrlLibrary';

/**
 * Прочитать исходную структуру и сформировать список полезных контролов
 * @param {IDescrUsefulCtrl[]} sourceList
 */
export const readCtrlLibrary = (sourceList: IDescrUsefulCtrl[]): UsefulCtrl[] => {
    // За один проход не получится обработать, т.к. предки в списке могут быть расположены позже потомков
    let current: IDescrUsefulCtrl[] = sourceList;
    const right: IDescrUsefulCtrl[] = [];
    const dict: Map<string, IDescrUsefulCtrl> = new Map();
    while (current.length > 0) {
        const left: IDescrUsefulCtrl[] = [];
        let count = 0;
        current.forEach((descr: IDescrUsefulCtrl) => {
            const parent = dict.get(descr.superClass);
            if (parent || descr.name === 'Base') {
                const newDescr: IDescrUsefulCtrl = parent ? createUsefulDescr(descr, parent) : descr;
                right.push(newDescr);
                dict.set(newDescr.name, newDescr);
                count++;
            } else {
                left.push(descr);
            }
        });
        if (count === 0) {
            console.error('Не найдены паренты для', left);
            throw new Error("При загрузке списка полезных контролов обнаружены элементы без родителя.");
        }
        current = left;
    }
    const destList: UsefulCtrl[] = right.map((descr: IDescrUsefulCtrl) => new UsefulCtrl(descr));
    return destList;
};

/**
 * Внутри описаний из папки descr в блоках props перечисляются описания контроллеров для каждого свойства
 * Но их дефолтные компоненты не годятся для размещения в таблице свойств.
 * Поэтому нужно назначить нужный, если явно не указано иное.
 * Для этого испольуется словарь, проецирующий тип контроллера в название дефолтного компонента
 * @type {Map}
 */
const defaultCompDict: Map<string, string> = new Map([
    ["String", "StringForProps"],
    ["Integer", "StringForProps"],
    ["DropList", "DropListForProps"],
]);

/**
 * Сформировать описание с полным списком пропсов, включая наследование от родителя
 * @param {IDescrUsefulCtrl} source
 * @param {IDescrUsefulCtrl} parent
 * @return {IDescrUsefulCtrl}
 */
const createUsefulDescr = (source: IDescrUsefulCtrl, parent: IDescrUsefulCtrl): IDescrUsefulCtrl => {
    const result: IDescrUsefulCtrl = {...source};
    // Свойства родителя в виде ассоциативного массива
    const propsDict: Map<string, IDescrCtrl> = parent.props.reduce((map, ctrlDescr) => {
        map.set(ctrlDescr.name, ctrlDescr);
        return map;
    }, new Map());
    const localProps: IDescrCtrl[] = source.props || [];
    localProps.forEach((descr: IDescrCtrl) => {
        propsDict.set(descr.name, descr);
    });
    // Удаление ненужных свойств, полученных от суперкласса
    if (source.remove) {
        source.remove.forEach((propName) => propsDict.delete(propName));
    }
    result.props = Array.from(propsDict.values());

    // Компоненты по-умолчанию
    result.props.forEach((descr) => {
        if (!descr.component) {
            const defaultCompName = defaultCompDict.get(descr.type);
            if (defaultCompName) {
                descr.component = defaultCompName;
            }
        }
    });
    if (source.partition === undefined) {
        result.partition = parent.partition;
    }
    return result;
};
