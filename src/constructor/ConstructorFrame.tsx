import * as React from 'react';
import './constructor.css';
import {Palette} from './Palette';
import {Board} from './board/Board';
import {ConMaster} from './ConMaster';
import {CurProps} from './propEditor/CurProps';
import {PreviewForm} from './PreviewForm';
import {BoardVisual} from './board/BoardVisual';
import {ShowCmdHistory} from './ShowCmdHistory';
import {observer} from 'mobx-react';
import {IActivator} from './IActivator';
import {CmdDeleteDummy} from './commands/CmdDeleteDummy';

interface IPropsConstructorFrame {
}

@observer
export class ConstructorFrame extends React.Component<IPropsConstructorFrame> {
    constructor(props: IPropsConstructorFrame) {
        super(props);
        this.master = new ConMaster();
    }

    private master: ConMaster;
    private activator: IActivator = {};

    private onSave = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.master.save();
    };
    private onLoad = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.master.load();
    };
    private onUndo = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.master.execUndo();
    };
    private onRedo = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.master.execRedo();
    };
    private onDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const dummy = ConMaster.get().currentDummy;
        if (dummy) {
            this.master.execCommand(new CmdDeleteDummy(dummy));
        }
    };
    private onKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'q' && e.altKey) {    // Alt+Q - предыдущий элемент
            ConMaster.get().selectNextDummy(-1);
            this.activator[ConMaster.get().currentPart]();
        } else if (e.key === 'a' && e.altKey) {     // Alt+A - следующий элемент
            ConMaster.get().selectNextDummy(1);
            this.activator[ConMaster.get().currentPart]();
        } else if (e.key === 'w' && e.altKey) { // Alt+W - переключение между элементом и его свойствами
            this.toggleDummyProps();
        }
    };

    private toggleDummyProps() {
        const {currentPart} = ConMaster.get();
        const needPart: string = currentPart === "board" ? "props" : "board";
        const activate = this.activator[needPart];
        if (activate) {
            activate();
        }
    }

    render() {
        return (
            <>
            <div className="con-header">
                <button type="button" onClick={this.onSave}>Save</button>
                <button type="button" onClick={this.onLoad}>Load</button>
                <button
                    type="button"
                    onClick={this.onUndo}
                    disabled={!ConMaster.get().isUndoPossible}
                >Undo</button>
                <button
                    type="button"
                    onClick={this.onRedo}
                    disabled={!ConMaster.get().isRedoPossible}
                >Redo</button>
                <button type="button" onClick={this.onDelete} disabled={!ConMaster.get().currentDummy}>Delete</button>
            </div>
            <div className="con-frame" onKeyUp={this.onKeyUp}>
                <Palette />
                <div className="con-board-box">
                    <BoardVisual activator={this.activator} />
                </div>
                <CurProps activator={this.activator} />
                <PreviewForm />
            </div>
            <ShowCmdHistory />
            </>
        );
    }
}
