import * as React from "react";
import {CtrlBase} from '../CtrlBase';

export interface IPropsFieldStd {
    label?: string;
    tooltip?: string;
}

export const FieldStd: React.FC<IPropsFieldStd> = (props) => (
    <div title={props.tooltip}>
        {props.label && <label className='control-label'>{props.label}</label>}
        {props.children}
    </div>
);
