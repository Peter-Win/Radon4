import {ValidatorBase} from './ValidatorBase';
import {IDescrValidator} from '../descr/IDescrValidator';
import {CtrlBase} from '../CtrlBase';
import {Field} from '../types';

export class ValidatorRegExp extends ValidatorBase {
    /**
     * Разбор регулярного выражения.
     * В ряде случаев оно указано в описании контроллера примерно так: data-regexp="/^[A-Z]+$/i"
     * Нужно получить RegExp
     * @param {string|RegExp} expSrc Описание регулярного выражения
     * @returns {RegExp} Регулярное выражение
     */
    public static parse(expSrc: string | RegExp): RegExp {
        if (typeof expSrc !== 'string') {
            return expSrc;
        }
        // Необходимо разложить конструкцию /exp/suffix
        const k1 = expSrc.indexOf('/');
        const k2 = expSrc.lastIndexOf('/');
        if (k2 <= k1) {
            throw new Error(`Invalid regexp definition: ${expSrc}`);
        }
        const exp = expSrc.slice(k1 + 1, k2);
        const  suffix = expSrc.slice(k2 + 1);
        return new RegExp(exp, suffix);
    }

    private readonly regExp: RegExp;

    constructor(descr: IDescrValidator, ctrl: CtrlBase) {
        super(descr, ctrl);
        this.regExp = ValidatorRegExp.parse(this.descr[Field.regExp]);
    }

    protected getRegExp() {
        return this.regExp;
    }
    protected getDefaultMessage(): string {
        return "Недопустимые символы";
    }


    public check(srcValue: any = null): string {
        const curValue: any = srcValue === null ? this.ctrl.val(false) : srcValue;
        if (!this.getRegExp().test(String(curValue))) {
            return this.getMessage();
        }
        return "";
    }
}