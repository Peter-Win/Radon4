import {IDescrUsefulCtrl} from '../IDescrUsefulCtrl';

export const descrDropList: IDescrUsefulCtrl = {
    name: "DropList",
    superClass: "Value",
    dummyType: "DropListDummy",
    label: "Выпадающий список",
    partition: "main",
    props: [
        {
            name: "options",
            label: "Опции",
            type: "String",
            component: "TextForProps",
            default: "[]",
            converters: ["JSON"],
            validators: ["NonEmpty", "JSON"],
        },
        {
            name: "default",
            label: "Значение по-умолчанию",
            type: "String",
            converters: ["ExcludeEmpty"],
        },
        {
            name: "optionLabel",
            label: "Поле описания",
            tooltip: "Название поля описания в записи опции",
            type: "String",
            converters: ["ExcludeEmpty"],
        },
        {
            name: "optionValue",
            label: "Поле значения",
            tooltip: "Название поля значения в записи опции",
            type: "String",
            converters: ["ExcludeEmpty"],
        },
        {
            name: "emptyLabel",
            label: "Описание пустой записи",
            type: "String",
            converters: ["ExcludeEmpty"],
        },
        {
            name: "emptyValue",
            label: "Значение пустой записи",
            type: "String",
            converters: ["ExcludeEmpty"],
        },
        {
            name: "sort",
            label: "Сортировка",
            type: "DropList",
            options: [
                {label: "- нет -", value: ""},
                {label: "По возрастанию", value: "ASC"},
                {label: "По убыванию", value: "DESC"},
            ],
            converters: ["ExcludeEmpty"],
        },
    ],
};
