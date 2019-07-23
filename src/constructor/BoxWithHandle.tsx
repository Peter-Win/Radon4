import * as React from 'react';
import {useDrag} from 'react-dnd';
import {ItemTypes} from './ItemTypes';
import {UsefulCtrl} from '../CtrlLibrary/UsefulCtrl';
import {Icon} from './Icon';

const style: React.CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    width: '20rem',
};

const handleStyle: React.CSSProperties = {
    backgroundColor: 'green',
    width: '1rem',
    height: '1rem',
    display: 'inline-block',
    marginRight: '0.75rem',
    cursor: 'move',
};

interface PropsBoxWithHandle {
    usefulCtrl: UsefulCtrl;
}

export const BoxWithHandle: React.FC<PropsBoxWithHandle> = (props) => {
    const {usefulCtrl} = props;
    const [{opacity}, drag, preview] = useDrag({
        item: {type: ItemTypes.NewUC, id: usefulCtrl.name},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });
    const iconUrl: string = usefulCtrl.getIcon();

    return (
        <div ref={drag} style={{...style, opacity}}>
            {!!iconUrl && <Icon url={iconUrl} />}
            {usefulCtrl.name}: {usefulCtrl.getLabel()}
        </div>
    );
};
