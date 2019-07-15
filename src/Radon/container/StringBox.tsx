/**
 * Если не завернуть строковые компоненты в такой контейнер, то вылазит баг:
 * При попытке ввести что-то в середину строки после ввода первого символа курсор прыгает на конец строки.
 */
import * as React from 'react';

type StringBoxChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export interface IPropsStringBox {
    value: string;
    onChange: (event: StringBoxChangeEvent) => void;
}
interface IStateStringBox {
    value: string;
}

export class StringBox extends React.Component<IPropsStringBox, IStateStringBox> {
    constructor (props: IPropsStringBox) {
        super(props);
        this.state = {value: props.value};
    }
    public componentWillReceiveProps(nextState: IStateStringBox) {
        if (nextState.value !== this.state.value) {
            this.setState({value: nextState.value});
        }
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    };

    render() {
        const {value} = this.state;
        const element = this.props.children;
        const props = {
            onChange: this.onChange,
            value,
        };
        return (
            React.Children.only(
                React.cloneElement(this.props.children as any, {
                    onChange: this.onChange,
                    value,
                }))
        );
    }
}

//
