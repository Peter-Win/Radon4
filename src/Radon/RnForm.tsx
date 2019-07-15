/**
 * Created by PeterWin on 07.07.2019.
 */
import * as React from "react";
import {FormBase} from  "./FormBase";
import {IDescrForm} from "./descr/IDescrForm";
import {Field, IStream} from './types';
import {RnCtrlShell} from './RnCtrlShell';

export interface IPropsRnForm {
    descr: IDescrForm;
    data?: IStream;
    getManager?: (manager: FormBase) => void;
}

interface IStateRnForm {
    status: "Ready" | "Wait" | "Error";
    manager: FormBase;
}

export class RnForm extends React.Component<IPropsRnForm, IStateRnForm> {

    public constructor(props: IPropsRnForm) {
        super(props);
        this.state = {status: "Ready", manager: this.createManager()};
    }
    private createManager() {
        const {props} = this;
        const manager: FormBase = FormBase.createInstance(props.descr);
        if (props.data) {
            manager.reset(); // Установить для всех контроллеров дефолтные значения
            manager.load(props.data, true);
        }
        if (this.props.getManager) {
            this.props.getManager(manager);
        }
        return manager;
    }

    componentWillReceiveProps(nextProps: IPropsRnForm) {
        const {manager} = this.state;
        if (this.props.data !== nextProps.data) {
            this.setState({status: 'Wait'});
            // Если для компонента изменились данные, то загрузить новые данные в контроллер формы
            // Это случается, если одну форму показывать несколько раз. Например, в модальном окне.
            manager.unlock(true);  // Принудительно разлочить форму
            manager.reset();
            manager.load(nextProps.data);
        } else if (this.props.descr !== nextProps.descr) {
            this.setState({manager: this.createManager()});
        }
    }

    private onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        let needNativeSubmit: boolean = false;
        try {
            needNativeSubmit = this.state.manager.onSubmit();
        } catch(e) {
            needNativeSubmit = false;
        }
        if (!needNativeSubmit) {
            event.preventDefault();
        }
    };

    private onReset = (event: React.ChangeEvent<HTMLFormElement>) => {
        try {
            this.state.manager.onReset();
        } catch(e) {
            console.error(e);
        }
        event.preventDefault();
    };

    public render() {
        return (
            <form name={this.state.manager.name} onSubmit={this.onSubmit} onReset={this.onReset}>
                {this.state.manager.ctrls.map((ctrl) => (<RnCtrlShell key={ctrl.getKey()} ctrl={ctrl} />))}
            </form>
        );
    }
}
