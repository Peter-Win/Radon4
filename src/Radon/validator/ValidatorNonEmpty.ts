/**
 * Проверка на заполнение поля.
 * Предполагается, что сырое значение не будет пустой строкой
 * Рекомендуется ставить в начале списка.
 * Пример использования:
 * { type: "String", name: "name", label: "Имя", validators: ["NonEmpty"] }
 * Если нужно указать сообщение, то:
 * validators: [{type: "NonEmpty", msg: "Не указано имя"}]
 */
import {ValidatorBase} from './ValidatorBase';

export class ValidatorNonEmpty extends ValidatorBase {
    protected getDefaultMessage(): string {
        return "Поле не заполнено";
    }
    public check(srcValue: any = null): string {
        const curValue: any = srcValue === null ? this.ctrl.val(false) : srcValue;
        const curStr = String(curValue);
        return !curStr ? this.getMessage() : "";
    }
}
