import {IDescrUsefulCtrl} from "../IDescrUsefulCtrl";

export const descrString: IDescrUsefulCtrl = {
    name: "String",
    superClass: "Value",
    label: "Строковое значение",
    partition: "main",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAeFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQQZKDAAAAJ3RSTlMALOnyx3eAD4jIHRbxHO6qr6n7mSfLrHztYrTs8AwbxQHd3OcoLepkxydKAAAA00lEQVRIx+3V1xKDIBAFUNBEo9i7aabv//9hbCFkAmZ5NON9gh2OsxaQkCVL5hW3MOFHzCgT1leASOByUAAqIQcmDngcADLzANvjWKI5Dvi8ZjsoILx9e6UJJEIBGoCklAoF6AcbmZgCUqEAyTC0voXk4zu1sxJEITzdPQcRr9Fuugaxq7eIOciCVy231WLnC1su9MaqoxJe7E9t8g+Bir6wBmAwPWFQwnS6etzJ7arRVXt9agDUaMH69XDGH6GsWw+VxqHb33mqc0zXlyA9/Nu/5wk7dWmCFxa8LgAAAABJRU5ErkJggg==",
    props: [
        {
            // TODO: Это свойство для примера. Не факт, что оно нужно.
            name: "maxLength",
            label: "Максимальная длина",
            type: "Integer",
            converters: ["Number", "ExcludeEmpty"],
        },
    ],
};
