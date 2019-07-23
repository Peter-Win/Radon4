import * as React from "react";
import "./PropsTableDemoStyle.css";
import {CtrlLibrary} from '../CtrlLibrary';
import {UsefulCtrl} from '../UsefulCtrl';
import {RnForm} from '../../Radon/RnForm';

CtrlLibrary.init();

interface IStatePropsTableDemo {
    activeName: string;
    usefulList: UsefulCtrl[];
}
interface IPropsPropsDemoTable {
}

export class PropsTableDemo extends React.Component<IPropsPropsDemoTable, IStatePropsTableDemo> {
    constructor(props: IPropsPropsDemoTable) {
        super(props);
        const usefulList = CtrlLibrary.list;
        this.state = {
            usefulList,
            activeName: usefulList[0].name,
        }
    }
    private onSelect = (name: string) => {
        this.setState({activeName: name});
    };
    render() {
        const {activeName} = this.state;
        const active = CtrlLibrary.dict.get(activeName);
        return (
            <div className="props-demo">
                <UsefulCtrlsList activeName={activeName} list={this.state.usefulList} onSelect={this.onSelect} />
                <div className="props-demo-form">
                    <div>{activeName} - {active.getLabel()}</div>
                    <RnForm descr={propsFormDescr(activeName)} />
                </div>
            </div>
        );
    }
}

// Список полезных контроллеров. Всегда один.
// Но может меняться активный
interface IPropsUCList {
    activeName: string;
    onSelect: (name: string) => void;
    list: UsefulCtrl[];
}
const UsefulCtrlsList: React.FC<IPropsUCList> = (props) => (
    <ul className="props-demo-list">
        {props.list.map((uc) => <li
            className={props.activeName === uc.name ? "active" : ""}
            onClick={(e) => props.onSelect(uc.name)}
        >{uc.getLabel()}</li>)}
    </ul>
);

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
