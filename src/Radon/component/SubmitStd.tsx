import * as React from 'react';
import {IPropsCommonComponent} from './CommonComponent';

export const SubmitStd: React.FC<IPropsCommonComponent> = (props) => (
    <input type="submit" value={props.label} />
);
