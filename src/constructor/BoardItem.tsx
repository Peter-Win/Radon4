import * as React from "react";
import {observer} from "mobx-react";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import * as cn from "classnames";
import {DummyItem} from './DummyItem';
import {ConMaster} from './ConMaster';
import {ItemTypes} from './ItemTypes';
import {Icon} from './Icon';

export interface IPropsBoardItem {
    index: number;
    dummy: DummyItem;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const BoardItem: React.FC<IPropsBoardItem> = observer( (props) => {
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
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id: props.dummy.key, index: props.dummy.getIndex() },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    const {dummy} = props;
    const isCurrent = dummy === ConMaster.get().currentDummy;
    const {errMsg} = dummy;
    const iconUrl: string = dummy.getUsefulCtrl().getIcon();
    return (
        <div
            ref={ref}
            className={cn("con-dummy", {"con-dummy-current": isCurrent, "con-dummy-error": !!errMsg})}
            style={{opacity}}
            onClick={() => props.dummy.activate()}
        >
            {!!iconUrl && <Icon url={iconUrl} />}
            {props.dummy.text}
        </div>
    )
});
