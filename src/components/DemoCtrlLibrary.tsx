import * as React from 'react';
import {CtrlLibrary} from '../CtrlLibrary/CtrlLibrary';
import {RnForm} from '../Radon/RnForm';
import {UsefulCtrl} from '../CtrlLibrary/UsefulCtrl';

interface IPropsDemoCtrlLibrary {

}
interface IStateDemoCtrlLibrary {

}

CtrlLibrary.init();

const propsFormDescr = (ctrlName: string) => {
    const usefulCtrl: UsefulCtrl = CtrlLibrary.dict.get(ctrlName);
    if (!usefulCtrl) {
        throw new Error(`Invalid useful ctrl name=${ctrlName}`);
    }
    const descr = {
        name: "props",
        ctrls: [
            {
                type: "Block",
                component: "PropsTable",
                ctrls: usefulCtrl.getPropsDescr(),
            }
        ],
    };
    return descr;
};

export class DemoCtrlLibrary extends React.Component<IPropsDemoCtrlLibrary, IStateDemoCtrlLibrary> {
    render() {
        return (
            <>
            <RnForm descr={propsFormDescr('String')} />
            </>
        );
    }
}
