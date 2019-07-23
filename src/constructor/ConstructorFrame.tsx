import * as React from 'react';
import './constructor.css';
import {Palette} from './Palette';
import {Board} from './Board';
import {ConMaster} from './ConMaster';
import {CurProps} from './CurProps';
import {PreviewForm} from './PreviewForm';
import {BoardVisual} from './BoardVisual';

interface IPropsConstructorFrame {
}

export class ConstructorFrame extends React.Component<IPropsConstructorFrame> {
    constructor(props: IPropsConstructorFrame) {
        super(props);
        this.master = new ConMaster();
    }

    private master: ConMaster;

    render() {
        return (
            <div className="con-frame">
                <Palette />
                <div className="con-board-box">
                    <BoardVisual />
                </div>
                <CurProps />
                <PreviewForm />
            </div>
        );
    }
}
