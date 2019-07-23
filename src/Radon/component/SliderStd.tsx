import * as React from "react";
import {IPropsStringStd} from './StringStd';
import {FieldStd} from '../container/FieldStd';

export interface IPropsSliderStd extends IPropsStringStd {
    min?: number;
    max?: number;
    step?: number;
}

export const SliderStd: React.FC<IPropsSliderStd> = (props) => (
    <FieldStd {...props}>
        <input
            type="range"
            name={props.name}
            min={props.min}
            max={props.max}
            step={props.step}
            value={props.value}
            onChange={props.onChange}
        />
    </FieldStd>
);
