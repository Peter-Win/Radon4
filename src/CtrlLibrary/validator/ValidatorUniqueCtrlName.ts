/**
 * Валидатор для проверки уникальности имени контроллера
 */
import {ValidatorBase} from '../../Radon/validator/ValidatorBase';
import {ConMaster} from '../../constructor/ConMaster';
import {DummyItem} from '../../constructor/DummyItem';

export class ValidatorUniqueCtrlName extends ValidatorBase {
    public check(srcValue: any = null): string {
        const thisName: string = String(this.ctrl.val());
        if (!thisName) {
            return ""; // Не проверяем пустые имена. Это делает NonEmpty
        }
        const count: number = ConMaster.get().parameters.reduce(
            (sum: number, dummy: DummyItem) => sum + +(dummy.getResultName() === thisName),
            0
        );
        return count > 1 ? this.getMessage() : "";
    }
    public getMessage(): string {
        return `Дублирование имени "${this.ctrl.val()}"`;
    }
}