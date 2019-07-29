/**
 * Компонент таблицы для формы свойств контроллера
 * Управляется блочным контроллером.
 * Предполагается, что в левой колонке будет выводиться label контроллера,
 * а в правой - компонент контроллера, который адаптирован для вывода в таблице.
 */
import * as React from 'react';
import {IPropsCommonComponent} from '../../Radon/component/CommonComponent';
import {CtrlBase} from '../../Radon/CtrlBase';
import {RnCtrlShell} from '../../Radon/RnCtrlShell';
import {Field} from '../../Radon/types';

interface IPropsPropsTable extends IPropsCommonComponent {
}

export const PropsTable: React.FC<IPropsPropsTable> = (props) => (
    <table className="props-table">
        <tbody>
        {props.ctrlList.map((ctrl: CtrlBase) => (<PropsTableRow key={ctrl.getKey()} ctrl={ctrl} />))}
        </tbody>
    </table>
);

interface IPropsPropsTableRow {
    ctrl: CtrlBase;
}

const PropsTableRow: React.FC<IPropsPropsTableRow> = (props) => {
    const {ctrl} = props;
    const errMsg: string = ctrl.getErrorMessage();
    return (
        <tr>
            <td className="props-col1">{props.ctrl.get(Field.label)}</td>
            <td className="props-col2"><RnCtrlShell ctrl={props.ctrl} /></td>
        </tr>
    );
};
