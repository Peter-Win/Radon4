import * as React from "react";
import {RnForm} from '../Radon/RnForm';
import {ConMaster} from './ConMaster';
import {DummyItem} from './DummyItem';
import {observer} from "mobx-react";


interface IPropsBoardVisual {
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
    return (
        <div className="con-board-visual">
            <h2>BoardVisual</h2>
            <RnForm descr={descr} />
        </div>
    );
});

