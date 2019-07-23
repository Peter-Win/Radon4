// Общий компонент. Бесполезен, но используется как прототип.
import * as React from "react";
import {CtrlBase} from '../CtrlBase';

export interface IPropsCommonComponent {
    type: string;
    name?: string;
    label?: string;
    tooltip?: string;
    ctrlList: CtrlBase[];
    disabled?: boolean;
    hidden?: boolean;
    cssClass?: string;
    errMsg: string;
}

export const CommonComponent: React.FC<IPropsCommonComponent> = (props) => (
    <div style={{color: 'red'}}>Invalid component {props.name}:{props.type}</div>
);
