/**
 * Компонент - оболочка для редактирования свойств текущего элемента
 */
import * as React from "react";
import {observer} from "mobx-react";
import {DummyItem} from '../DummyItem';
import {ConMaster} from '../ConMaster';
import {UsefulCtrl} from '../../CtrlLibrary/UsefulCtrl';
import {IDescrForm} from '../../Radon/descr/IDescrForm';
import {RnForm} from '../../Radon/RnForm';
import {FormBase, IFormEvent} from '../../Radon/FormBase';
import {IStream} from '../../Radon/types';
import {IActivator} from '../IActivator';

interface IPropsCurProps {
    activator: IActivator;
}
export const CurProps: React.FC<IPropsCurProps> = observer((props) => {
    const dummy: DummyItem | null = ConMaster.get().currentDummy;
    return (
        <div className="con-props-box">
            {dummy ? <DummyProps dummy={dummy} activator={props.activator} /> : <EmptyDummy />}
        </div>
    )
});

const EmptyDummy: React.FC = (props) => (
    <div>Не выбрано</div>
);

interface IPropsDummyProps {
    dummy: DummyItem;
    activator: IActivator;
}

const DummyProps: React.FC<IPropsDummyProps> = observer( (props) => {
    const {dummy} = props;
    const manager: FormBase = dummy.getPropsManager();
    const usefulCtrl: UsefulCtrl = dummy.getUsefulCtrl();
    const onFocus = (e: React.FocusEvent<HTMLElement>) => {
        ConMaster.get().currentPart = "props";
    };
    props.activator.props = () => {
        const manager: FormBase = dummy.getPropsManager();
        manager.focus();
    };
    return (
        <div onFocus={onFocus}>
            <h3>{usefulCtrl.getLabel()}</h3>
            <RnForm descr={manager} data={dummy.data} />
        </div>
    );
});
