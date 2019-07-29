import * as React from "react";
import {observer} from "mobx-react";
import {ConMaster} from './ConMaster';
import {RnForm} from '../Radon/RnForm';

export const PreviewForm: React.FC = observer( (props) => {
    const master: ConMaster = ConMaster.get();
    let formMsg: string = "";
    if (master.parameters.length < 1) {
        formMsg = "Не создано ни одного параметра";
    } else if (master.errorsCount > 0) {
        formMsg = "Нужно устранить ошибки в метаданных";
    }
    const resultMeta = ConMaster.get().resultMetaData;
    const descr = {
        name: "preview",
        ctrls: resultMeta,
    };
    return (
        <div className="con-preview-box">
            <h3>Preview</h3>
            <h4>metadata:</h4>
            <pre>{JSON.stringify(resultMeta, null, '  ')}</pre>
            <h4>demo data:</h4>
            <pre>{JSON.stringify(master.demoData, null, '  ')}</pre>
        </div>
    )
});

// {formMsg ? <div style={{color: 'red'}}>{formMsg}</div> : <RnForm descr={descr} />}
