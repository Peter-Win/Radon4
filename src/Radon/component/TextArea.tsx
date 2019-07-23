import * as React from 'react';
import {FieldStd} from '../container/FieldStd';
import {IPropsCommonComponent} from './CommonComponent';
import {StringBox} from '../container/StringBox';

export interface IPropsTextArea extends IPropsCommonComponent {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows: string | number;
    cols: string | number;
}

export const TextArea: React.FC<IPropsTextArea> = (props) => (
    <FieldStd {...props}>
        <StringBox onChange={props.onChange} value={props.value}>
        <textarea
            name={props.name}
            rows={(+props.rows) || null}
            cols={(+props.cols) || null}
            />
        </StringBox>
    </FieldStd>
);
