import {IDescrUsefulCtrl} from "../IDescrUsefulCtrl";
import {descrBase} from "./descrBase";
import {descrInteger} from "./descrInteger";
import {descrString} from "./descrString";
import {descrValue} from "./descrValue";
import {descrRange} from './descrRange';
import {descrCheckBox} from './descrCheckBox';

export const descrAllUseful: IDescrUsefulCtrl[] = [
    descrBase,
    descrCheckBox,
    descrValue,
    descrString,
    descrInteger,
    descrRange,
];
