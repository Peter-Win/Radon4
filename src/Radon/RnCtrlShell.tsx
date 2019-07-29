import * as React from "react";
import {CtrlBase} from "./CtrlBase";
import {CommonComponent} from './component/CommonComponent';
import {IDescrCtrl} from './descr/IDescrCtrl';
import {IStream, RnComponent} from './types';

export interface IPropsRnCtrlShell {
    ctrl: CtrlBase;
}

export class RnCtrlShell extends React.Component<IPropsRnCtrlShell, IDescrCtrl> {
    private component: RnComponent;
    private bMount: boolean = false;
    constructor(props: IPropsRnCtrlShell) {
        super(props);
        const {ctrl} = props;
        this.component = props.ctrl.createComponent();
        this.state = {...ctrl.descr};

        // Назначить функцию, которая отвечает за обновление компонент при изменении полей контроллера
        // data = {field: value}
        ctrl.dispatchChanges = (data: IStream) => {
            if (this.bMount) {
                this.setState(data);
            }
        };
    }
    componentDidMount() {
        this.bMount = true;
    }
    componentWillUnmount() {
        if (this.state.manager) {
            this.state.manager.bDead = true;
        }
        this.bMount = false;
    }
    setFocusableElement = (element: HTMLElement | null) => {
        this.props.ctrl.setFocusableElement(element);
    };

    render() {
        const {ctrl} = this.props;
        if (!this.component || !ctrl.isVisible()) {
            // Если контроллер невидим, то ничего не выводится
            return null;
        }
        const ctrlList: CtrlBase[] = ctrl.ctrls;
        return (<this.component
            {...this.state}
            errMsg={ctrl.getErrorMessage()}
            ctrlList={ctrlList}
            setFocusableElement={this.setFocusableElement}
            {...ctrl.getPropsMap()}
        />);
    }
}
/*

            visit={this.visit}

 */