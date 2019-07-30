import * as React from "react";
import {PropsTableRow} from './PropsTable';
import {IPropsSelectStd} from '../../Radon/component/SelectStd';
import {ISelectOption} from '../../Radon/ctrl/CtrlDropList';

export const DropListForProps: React.FC<IPropsSelectStd> = (props) => (
    <PropsTableRow {...props}>
        <select
            name={props.name}
            value={String(props.value)}
            onChange={(e: React.FormEvent<HTMLSelectElement>) => props.setValue(e.currentTarget.value)}
        >
            {props.viewOptions.map((option: ISelectOption) => (
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
    </PropsTableRow>
);
