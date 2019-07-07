/**
 * Created by PeterWin on 07.07.2019.
 */
import * as React from "react";
import {FormBase} from  "./FormBase";
import {IDescrForm} from "./IDescrForm";
import {IStream} from "./types";

export interface IPropsRnForm {
    descr: IDescrForm;
    data?: IStream;
    getManager?: (manager: FormBase) => void;
}

export class RnForm extends React.Component<IPropsRnForm, {}> {
    private manager: FormBase;

    public constructor(props: IPropsRnForm) {
        super(props);
        this.manager = FormBase.createInstance(props.descr);
        if (props.data) {
            this.manager.load(props.data, true);
        }
        if (props.getManager) {
            props.getManager(this.manager);
        }
    }

    public render() {
        const {descr} = this.props;
        return (
            <div>
                This is form <b>{descr.name}</b>
                <pre>{JSON.stringify(descr, null, "  ")}</pre>
            </div>
        );
    }
}
