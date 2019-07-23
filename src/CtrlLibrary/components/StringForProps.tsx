import * as React from 'react';
import * as cn from "classnames";
import {IPropsStringStd} from '../../Radon/component/StringStd';
import {StringBox} from '../../Radon/container/StringBox';

export const StringForProps: React.FC<IPropsStringStd> = (props) => (
    <StringBox value={props.value} onChange={props.onChange}>
        <input type="text" name={props.name} disabled={props.disabled} className={cn({invalid: props.errMsg})} />
    </StringBox>
);
