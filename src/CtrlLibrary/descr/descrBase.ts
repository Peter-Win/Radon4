import {IDescrUsefulCtrl} from "../IDescrUsefulCtrl";

export const descrBase: IDescrUsefulCtrl = {
    name: "Base",
    superClass: "", // Такое разрешено тольео для Base
    label: "Базовый контроллер",
    partition: "",
    props: [
        {
            name: "name",
            label: "Идентификатор",
            type: "String",
            validators: [
                {type: "NonEmpty", msg: "Не задан идентификатор"},
                {type: "RegExp", regExp: "/^[a-z0-9_]*$/i", msg: "Идентификатор содержит недопустимые символы"}
            ],
        },
        {
            name: "label",
            label: "Читабельное наименование",
            type: "String",
        },
        {
            name: "disabledIf",
            label: "Условие для запрещения",
            type: "String",
            converters: ["ExcludeEmpty"],
        },
    ],
};
