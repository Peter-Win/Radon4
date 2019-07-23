import * as React from 'react';
import {FormBase} from '../Radon/FormBase';
import {RnForm} from '../Radon/RnForm';
import {IStream} from '../Radon/types';
import {IDescrForm} from '../Radon/descr/IDescrForm';

const formDescr = {
    ctrls: [
        {
            label: 'First name',
            name: 'firstName',
            type: 'String',
            validators: ["NonEmpty"],
        },
        {
            label: 'Last name',
            name: 'lastName',
            type: 'String',
        },
        {
            label: 'Сумма',
            name: 'sum',
            type: 'String',
            converters: ['Number'],
            default: 22,
        },
        {
            label: 'Заблокировано',
            name: 'blocked',
            type: 'String',
            disabled: true,
            default: 'Bla-Bla',
        },
        {
            label: 'Заметки',
            name: 'notes',
            type: 'String',
            component: "TextArea",
        },
        {
            label: 'Согласовано',
            name: 'approved',
            type: 'Boolean',
            default: true,
        },
        {
            label: 'Готово!',
            type: 'Submit'
        },
        {
            label: 'Сбросить',
            type: 'Reset',
        }
    ],
    name: 'first',
};

const dataFormDescr = {
    name: 'data',
    ctrls: [
        {
            name: 'data',
            type: 'String',
            component: 'TextArea',
            rows: 8,
            cols: 80,
        },
        {
            type: 'Submit',
        }
    ],
};

const metaFormDescr = {
    name: 'meta',
    ctrls: [
        {
            name: 'meta',
            type: 'String',
            component: 'TextArea',
            rows: 16,
            cols: 80,
        },
        {
            type: 'Submit',
        }
    ],
};

const formData = {
    firstName: 'Полиграф',
    lastName: 'Шариков',
    middleName: 'Полиграфыч',
};


interface IPropsDemoForm {
}

interface IStateDemoForm {
    data: IStream;
    meta: IDescrForm;
}

export class DemoForm extends React.Component<IPropsDemoForm, IStateDemoForm> {
    constructor(props: IPropsDemoForm) {
        super(props);
        this.state = {
            data: formData,
            meta: formDescr,
        }
    }

    private onManager = (manager: FormBase): void => {
        manager.addEventListener('update', () => {
            const data: IStream = manager.save({}, true);
            if (JSON.stringify(data) !== JSON.stringify(this.state.data)) {
                this.setState({data});
            }
        });
        manager.addEventListener('submit', () => {
            console.log('Submit!', manager.save({}, true));
        })
    };
    private onManagerData = (manager: FormBase): void => {
        manager.addEventListener('submit', () => {
            const data: IStream = manager.save({}, true);
            this.setState({data: JSON.parse(data.data)});
        });
    };

    private makeEditableData(): IStream {
        return {data: JSON.stringify(this.state.data, null, '  ')};
    }

    private makeMetaData(): IStream {
        return {meta: JSON.stringify(this.state.meta, null, '  ')};
    }

    private onManagerMeta = (manager: FormBase): void => {
        manager.addEventListener("submit", () => {
            const data = manager.save({}, true);
            const meta = JSON.parse(data.meta);
            this.setState({meta});
        });
    };

    public render() {
        return (
            <>
            <h2>Форма</h2>
            <RnForm descr={this.state.meta} data={this.state.data} getManager={this.onManager} />
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <h3>Данные</h3>
                    <RnForm descr={dataFormDescr} data={this.makeEditableData()} getManager={this.onManagerData} />
                </div>
                <div style={{flex: 1}}>
                    <h3>Метаданные</h3>
                    <RnForm descr={metaFormDescr} data={this.makeMetaData()} getManager={this.onManagerMeta} />
                </div>
            </div>
            </>
        );
    }
}
