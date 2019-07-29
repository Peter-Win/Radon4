import * as React from "react";
import * as cn from "classnames";
import {IPropsCommonComponent} from './CommonComponent';
import {TValue} from '../types';
import {FieldStd} from '../container/FieldStd';
import {CtrlBase} from '../CtrlBase';
import {ISelectOption} from '../ctrl/CtrlDropList';

interface IPropsSelectStd extends IPropsCommonComponent {
    value: TValue;
    viewOptions: ISelectOption[];
    setValue: (value: string) => void;
}

export const SelectStd: React.FC<IPropsSelectStd> = (props) => {
    const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        props.setValue(e.currentTarget.value);
    };
    return (
        <FieldStd {...props}>
            <select
                name={props.name}
                value={String(props.value)}
                onChange={onChange}
            >
                {props.viewOptions.map((option: ISelectOption) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        </FieldStd>
    );
};
