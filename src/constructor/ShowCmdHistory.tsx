import * as React from "react";
import {observer} from "mobx-react";
import {CmdBase} from './commands/CmdBase';
import {ConMaster} from './ConMaster';

export const ShowCmdHistory: React.FC = observer( (props) => (
    <div>
        <h3>История</h3>
        <div>
            <ShowCmdList header="Undo" cmdList={ConMaster.get().undoList} />
            <ShowCmdList header="Redo" cmdList={ConMaster.get().redoList} />
        </div>
    </div>
));

interface IPropsShowCmdList {
    header: string;
    cmdList: CmdBase[];
}

const ShowCmdList: React.FC<IPropsShowCmdList> = observer( (props) => (
    <div className="con-cmd-history">
        <h4>{props.header}</h4>
        {props.cmdList.map((cmd: CmdBase) => <div key={cmd.key}>{cmd.getMessage()}</div>)}
    </div>
));
