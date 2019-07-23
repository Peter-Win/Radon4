import {expandValidatorDescr, IDescrValidator, TDescrValidatorExt} from '../descr/IDescrValidator';
import {Rn} from '../Rn';
import {CtrlBase} from '../CtrlBase';
import {IDescrError} from '../descr/IDescrError';

export interface IDictValidators {
    [key: string]: typeof ValidatorBase;
}


export class ValidatorBase {
    public static createInstance(descrExt: TDescrValidatorExt, ctrl: CtrlBase): ValidatorBase {
        // Если описание валидатора в виде строки, н.р. "NonEmpty", то перевести в структуру.
        const descr: IDescrValidator = expandValidatorDescr(descrExt);
        const Constructor = Rn.dict.validators[descr.type];
        if (!Constructor) {
            throw new Error(`Not found validator with type: ${descr.type}`);
        }
        const inst: ValidatorBase = new Constructor(descr, ctrl);
        return inst;
    }
    protected getDefaultMessage(): string {
        return "Ошибка!";
    }
    protected constructor(protected descr: IDescrValidator, protected ctrl: CtrlBase) {
    }

    public getMessage() {
        return this.descr.msg || this.getDefaultMessage();
    }
    public createErrorInfo(msg: string): IDescrError {
        return {msg, owner: this.ctrl};
    }

    /**
     * Результат проверки: пустая строка, если ок. Сообщение, если есть ошибка.
     *
     * Обычно валидатор должен проверить значение своего контроллера, получаемое через val или getValue
     * Но в некоторых случаях требуется проверить и другие контроллеры,
     * Например если при покупке детского билета возраст не должен превышать 5 лет, то поле возраста будет иметь ошибку
     * если его контроллер больше 5, а контроллер тарифа имеет значение "Детский билет".
     * if (this.ctrl.val() > 5 && this.ctrl.form.findCtrlByName("tarif").val() === "child") return this.getMessage()
     *
     * Есть и второй случай применения валидатора - проверка поля на обязательность заполнения.
     * В этом случае в параметр передаётся дефолтное значение контроллера и проверять надо его.
     * В сложных случаях это не работает, но для большинства ситуаций - норм.
     * @param value
     * @return {string}
     */
    public check(value: any = null): string {
        return "";
    }
}
