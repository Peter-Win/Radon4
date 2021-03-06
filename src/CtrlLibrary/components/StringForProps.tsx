import * as React from 'react';
import {IPropsStringStd} from '../../Radon/component/StringStd';
import {StringBox} from '../../Radon/container/StringBox';
import {PropsTableRow} from './PropsTable';

export const StringForProps: React.FC<IPropsStringStd> = (props) => (
    <PropsTableRow {...props}>
        <StringBox value={props.value} onChange={props.onChange}>
            <input
                type="text"
                name={props.name}
                disabled={props.disabled}
                ref={props.setFocusableElement}
            />
        </StringBox>
    </PropsTableRow>
);
