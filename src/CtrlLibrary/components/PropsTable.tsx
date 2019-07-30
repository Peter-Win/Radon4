/**
 * Компонент таблицы для формы свойств контроллера
 * Управляется блочным контроллером.
 * Предполагается, что в левой колонке будет выводиться label контроллера,
 * а в правой - компонент контроллера, который адаптирован для вывода в таблице.
 */
import * as React from 'react';
import * as cn from "classnames";
import {IPropsCommonComponent} from '../../Radon/component/CommonComponent';
import {CtrlBase} from '../../Radon/CtrlBase';
import {RnCtrlShell} from '../../Radon/RnCtrlShell';
import {Field} from '../../Radon/types';

interface IPropsPropsTable extends IPropsCommonComponent {
}

export const PropsTable: React.FC<IPropsPropsTable> = (props) => (
    <table className="props-table">
        <tbody>
        {props.ctrlList.map((ctrl: CtrlBase) => (<RnCtrlShell key={ctrl.key} ctrl={ctrl} />))}
        </tbody>
    </table>
);

interface IPropsPropsTableRow extends IPropsCommonComponent {
}

export const PropsTableRow: React.FC<IPropsPropsTableRow> = (props) => {
    const {errMsg, label, children} = props;
    return (
        <tr title={errMsg} className={cn({invalid: !!errMsg}, "props-row")}>
            <td className="props-col1">{label}</td>
            <td className="props-col2">{children}</td>
        </tr>
    );
};
