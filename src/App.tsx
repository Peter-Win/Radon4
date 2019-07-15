import * as React from "react";
import {initRadon} from "./Radon/initRadon";
import {DemoForm} from './components/DemoForm';

initRadon();

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <h1>This is demo application</h1>
                <DemoForm />
            </>
        );
    }
}
