import {CtrlString} from './CtrlString';

export class CtrlRange extends CtrlString {
    protected getDefaultComponent() {
        return "SliderStd";
    }
}