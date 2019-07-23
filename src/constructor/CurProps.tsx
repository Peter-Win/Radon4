import * as React from "react";
import {observer} from "mobx-react";
import {DummyItem} from './DummyItem';
import {ConMaster} from './ConMaster';
import {UsefulCtrl} from '../CtrlLibrary/UsefulCtrl';
import {IDescrForm} from '../Radon/descr/IDescrForm';
import {RnForm} from '../Radon/RnForm';
import {FormBase, IFormEvent} from '../Radon/FormBase';
import {IStream} from '../Radon/types';

interface IPropsCurProps {
}
export const CurProps: React.FC<IPropsCurProps> = observer((props) => {
    const dummy: DummyItem | null = ConMaster.get().currentDummy;
    return (
        <div className="con-props-box">
            {dummy ? <DummyProps dummy={dummy} /> : <EmptyDummy />}
        </div>
    )
});

const EmptyDummy: React.FC = (props) => (
    <div>Не выбрано</div>
);

interface IPropsDummyProps {
    dummy: DummyItem;
}
const DummyProps: React.FC<IPropsDummyProps> = (props) => {
    const {dummy} = props;
    const usefulCtrl: UsefulCtrl = dummy.getUsefulCtrl();
    const propsFormDescr: IDescrForm = {
        name: "propsOf" + usefulCtrl.name,
        label: usefulCtrl.getLabel(),
        ctrls: [
            {
                type: 'Block',
                component: 'PropsTable',
                label: usefulCtrl.getLabel(),
                ctrls: dummy.buildMeta(),
            },
        ],
    };
    const onManager = (manager: FormBase) => {
        manager.addEventListener("update", (event: IFormEvent) => {
            const data: IStream = manager.save({}, true);
            dummy.data = data;
        });
    };
    return (
        <div>
            <h3>{usefulCtrl.getLabel()}</h3>
            <RnForm descr={propsFormDescr} data={dummy.data} getManager={onManager} />
        </div>
    );
};

//             <pre>{JSON.stringify(propsFormDescr, null, '  ')}</pre>
