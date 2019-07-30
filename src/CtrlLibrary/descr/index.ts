import {IDescrUsefulCtrl} from "../IDescrUsefulCtrl";
import {descrBase} from "./descrBase";
import {descrInteger} from "./descrInteger";
import {descrString} from "./descrString";
import {descrValue} from "./descrValue";
import {descrRange} from './descrRange';
import {descrCheckBox} from './descrCheckBox';
import {descrDropList} from './descrDropList';

export const descrAllUseful: IDescrUsefulCtrl[] = [
    descrBase,
    descrCheckBox,
    descrDropList,
    descrValue,
    descrString,
    descrInteger,
    descrRange,
];
