import * as React from 'react';
import {BoardBlock} from './BoardBlock';

export const Board: React.FC<{}> = (props) => {
    return (
        <div className="con-board-old">
            <h2>Board</h2>
            <BoardBlock />
        </div>
    )
};
