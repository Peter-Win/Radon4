import * as React from "react";
import {IPropsCommonComponent} from './CommonComponent';

interface IPropsCheckBox extends IPropsCommonComponent {
    value: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox: React.FC<IPropsCheckBox> = (props: IPropsCheckBox) => (
    <div>
        <label>
            <input
                type="checkbox"
                name={props.name}
                checked={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            {props.label}
        </label>
    </div>
);
