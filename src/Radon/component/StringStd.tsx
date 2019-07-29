import * as React from 'react';
import {FieldStd} from '../container/FieldStd';
import {IPropsCommonComponent} from './CommonComponent';
import {StringBox} from '../container/StringBox';

export interface IPropsStringStd extends IPropsCommonComponent {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class StringStd extends React.Component<IPropsStringStd> {
    render() {
        const {props} = this;
        return <FieldStd {...props}>
            <StringBox value={props.value} onChange={props.onChange}>
                <input type="text" name={props.name} disabled={props.disabled} ref={props.setFocusableElement} />
            </StringBox>
        </FieldStd>
    }
}
