import * as React from "react";
import * as cn from "classnames";
import {DummyItem} from './DummyItem';
import {IPropsCommonComponent} from '../Radon/component/CommonComponent';
import {ConMaster} from './ConMaster';
import {observer} from "mobx-react";
import {RnCtrlShell} from '../Radon/RnCtrlShell';
import {CtrlBase} from '../Radon/CtrlBase';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import {ItemTypes} from './ItemTypes';

interface IPropsDummyComponent extends IPropsCommonComponent {
    index: number;
    dummy: DummyItem;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const DummyComponent: React.FC<IPropsDummyComponent> = observer( (props) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            const dummy = ConMaster.get().parameters[dragIndex];
            // Don't replace items with themselves
            if (dummy === props.dummy) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current!.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            ConMaster.get().moveDummies(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.CARD, id: props.dummy.key, index: props.dummy.getIndex() },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    const {dummy, ctrlList} = props;
    const isCurrent = dummy === ConMaster.get().currentDummy;
    const {errMsg} = dummy;
    const iconUrl: string = dummy.getUsefulCtrl().getIcon();
    return (
        <div
            ref={ref}
            className={cn("con-dummy", {"con-dummy-current": isCurrent, "con-dummy-error": !!errMsg})}
            style={{opacity}}
            onClick={() => dummy.activate()}
            title={errMsg}
        >
            <div draggable className="con-drag-right" onDragStart={(e)=>{e.preventDefault(); console.log('Prevent drag start')}}>
                {ctrlList.map((ctrl: CtrlBase) => <RnCtrlShell key={ctrl.getKey()} ctrl={ctrl} />)}
            </div>
        </div>
    );
});

//             <div className="con-drag-handler" ref={ref}></div>
