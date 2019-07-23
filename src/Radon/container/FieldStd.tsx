import * as React from "react";
import * as cn from 'classnames';

export interface IPropsFieldStd {
    label?: string;
    tooltip?: string;
    errMsg: string;
    cssClass?: string;
}

export const FieldStd: React.FC<IPropsFieldStd> = (props) => (
    <div title={props.errMsg || props.tooltip} className={cn(props.cssClass, {"rn-error": !!props.errMsg})} >
        {props.label && <label className='rn-label'>{props.label}</label>}
        {props.children}
    </div>
);
