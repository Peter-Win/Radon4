/**
 * Приёмник для элементов.
 * Блок тех элементов, которые набрасываются из палитры
 */
import * as React from "react";
import { useDrop } from 'react-dnd';
import {ItemTypes} from './ItemTypes';
import {BoardItem} from './BoardItem';
import {ConMaster} from './ConMaster';
import {observer} from "mobx-react";
import {DummyItem} from './DummyItem';
import {UsefulCtrl} from '../CtrlLibrary/UsefulCtrl';
import {CtrlLibrary} from '../CtrlLibrary/CtrlLibrary';

function getStyle(backgroundColor: string): React.CSSProperties {
    return {
        border: '1px solid rgba(0,0,0,0.2)',
        minHeight: '8rem',
        minWidth: '8rem',
        color: 'white',
        backgroundColor,
        padding: '2rem',
        paddingTop: '1rem',
        margin: '1rem',
        textAlign: 'center',
        float: 'left',
        fontSize: '1rem',
    }
}

interface INewUsefulCtrl {
    type: string;
    id: string;
}

export const BoardBlock = observer( (props) => {

    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: ItemTypes.NewUC,
        drop(item, monitor) {
            const didDrop = monitor.didDrop();
            const usefulCtrl = CtrlLibrary.dict.get((item as INewUsefulCtrl).id);
            const dummy = new DummyItem(usefulCtrl);
            ConMaster.get().parameters.push(dummy);
            ConMaster.get().setCurrentDummy(dummy);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    });

    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent /*|| (isOver && greedy)*/) {
        backgroundColor = 'darkgreen'
    }

    return (
        <div ref={drop} style={getStyle(backgroundColor)}>
            {ConMaster.get().parameters.map((dummy, i) => <BoardItem key={dummy.key} index={i} dummy={dummy} />)}
        </div>
    )
});
