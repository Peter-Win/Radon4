import * as React from 'react';
import {IPropsStringStd} from '../../Radon/component/StringStd';
import {PropsTableRow} from './PropsTable';
import {StringBox} from '../../Radon/container/StringBox';

export const TextForProps: React.FC<IPropsStringStd> = (props) => (
    <PropsTableRow {...props}>
        <StringBox value={props.value} onChange={props.onChange}>
            <textarea
                name={props.name}
                disabled={props.disabled}
                ref={props.setFocusableElement}
            />
        </StringBox>
    </PropsTableRow>
);