import * as React from "react";
import * as cn from "classnames";
import {IPropsCommonComponent} from './CommonComponent';
import {CtrlBase} from '../CtrlBase';
import {RnCtrlShell} from '../RnCtrlShell';
import {Field, TValue} from '../types';

interface IPropsTabHost extends IPropsCommonComponent {
    value: TValue;
    onActivate(ctrl: CtrlBase): void;
}

const onActivate = (e: React.MouseEvent<HTMLElement>, ctrl: CtrlBase, callBack: (ctrl: CtrlBase)=>void) => {
    e.preventDefault();
    callBack(ctrl);
};

export const TabHost: React.FC<IPropsTabHost> = (props: IPropsTabHost) => {
    const {ctrlList} = props;
    const isActive = (ctrl: CtrlBase) => ctrl.get(Field.option) === props.value;
    return (
        <div className={props.cssClass}>
            <ul className="nav-tabs">
                {/* Список вкладок */}
                {ctrlList.map(ctrl => (
                    <li
                        key={ctrl.key}
                        className={cn({active: isActive(ctrl)})}
                        onClick={event => onActivate(event, ctrl, props.onActivate)}
                    >
                        <a href='#'>{ctrl.get(Field.label)}</a>
                    </li>
                ))}
            </ul>
            {/* Содержимое активной вкладки */}
            <div className='alert row'>
                {ctrlList.map(ctrl => (isActive(ctrl) ? <RnCtrlShell key={ctrl.key} ctrl={ctrl} /> : null))}
            </div>
        </div>
    );
};
