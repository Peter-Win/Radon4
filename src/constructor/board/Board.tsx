import * as React from 'react';
import {BoardBlock} from './BoardBlock';

/**
 * @deprecated Замена на BoardVisual
 * @param props
 * @return {any}
 * @constructor
 */
export const Board: React.FC<{}> = (props) => {
    return (
        <div className="con-board-old">
            <h2>Board</h2>
            <BoardBlock />
        </div>
    )
};
