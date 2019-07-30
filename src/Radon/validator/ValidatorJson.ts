import {ValidatorBase} from './ValidatorBase';

export class ValidatorJson extends ValidatorBase {
    public check(srcValue: any = null): string {
        const curValue: any = srcValue === null ? this.ctrl.val(false) : srcValue;
        if (!curValue) {
            return "";
        }
        try {
            JSON.parse(curValue);
            return "";
        } catch (e) {
            return e.message || "!"; // TODO: Не самый лучший вариант, т.к. это сообщение может быть не на нужном языке
        }
    }
    protected getDefaultMessage(): string {
        return "Ошибка в JSON";
    }
}
