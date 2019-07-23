import * as React from "react";
import {IPropsCommonComponent} from './CommonComponent';
import {CtrlBase} from '../CtrlBase';
import {RnCtrlShell} from '../RnCtrlShell';

export const BlockStd: React.FC<IPropsCommonComponent> = (props) => (
    <div className={props.cssClass}>
        {props.ctrlList.map((ctrl: CtrlBase) => (<RnCtrlShell key={ctrl.getKey()} ctrl={ctrl}/>))}
    </div>
);
