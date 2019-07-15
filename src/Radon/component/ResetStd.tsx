import * as React from 'react';
import {IPropsCommonComponent} from './CommonComponent';

export const ResetStd: React.FC<IPropsCommonComponent> = (props) => (
    <input type="reset" value={props.label} />
);
