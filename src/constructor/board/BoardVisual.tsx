import * as React from "react";
import {RnForm} from '../../Radon/RnForm';
import {ConMaster} from '../ConMaster';
import {DummyItem} from '../DummyItem';
import {observer} from "mobx-react";
import {FormBase, IFormEvent} from '../../Radon/FormBase';
import {IActivator} from '../IActivator';
import {CtrlBase} from '../../Radon/CtrlBase';
import {VisitorResult} from '../../Radon/Visitor';


interface IPropsBoardVisual {
    activator: IActivator;
}

export const BoardVisual: React.FC<IPropsBoardVisual> = observer( (props) => {
    const master: ConMaster = ConMaster.get();
    const descr = {
        name: "boardVisual",
        ctrls: [
            {
                type: "Block",
                component: "DropFrame",
                ctrls: master.parameters.map((dummy: DummyItem, index) => ({
                    type: "Block",
                    component: "DummyComponent",
                    dummy,
                    index,
                    ctrls: [{
                        ...dummy.getResultMeta(),
                    }],
                })),
            },
        ],
    };
    const onManager = (manager: FormBase) => {
        const oldDataStr = JSON.stringify(manager.save());
        // manager.onUserChange = ConMaster.onUserCtrlChange;
        manager.addEventListener("update", (event: IFormEvent) => {
            const newData = manager.save();
            if (oldDataStr !== JSON.stringify(newData)) {
                master.demoData = newData; // Перерисовка
            }
        });
        const getCtrlByIndex = (index: number): CtrlBase => {
            // TODO: не очень хорошая реализация, т.к. используются знания о внутренней организации формы
            // м.б. лучше через walk искать контроллеры с DummyComponent
            return manager.ctrls[0].ctrls[index];
        };
        props.activator.board = () => {
            const dummyIndex: number = ConMaster.get().getCurrentDummyIndex();
            const ctrlBox = getCtrlByIndex(dummyIndex);
            const result: VisitorResult = ctrlBox.walk({
                ctrlBegin: (ctrl: CtrlBase) => ctrl.getFocusableElement() ? ctrl : null,
            });
            const focusableCtrl = result as CtrlBase;
            focusableCtrl.focus();
        };
    };
    const onFocus = (e: React.FocusEvent<HTMLElement>) => {
        ConMaster.get().currentPart = "board";
    };
    return (
        <div className="con-board-visual" onFocus={onFocus}>
            <h2>BoardVisual</h2>
            <RnForm descr={descr} data={master.demoData} getManager={onManager} />
        </div>
    );
});

