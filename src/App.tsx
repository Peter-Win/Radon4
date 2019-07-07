import * as React from "react";
import {FormBase} from "./Radon/FormBase";
import {initRadon} from "./Radon/initRadon";
import {RnForm} from "./Radon/RnForm";
import {IStream} from "./Radon/types";
import {test} from "./test";

test();

const formDescr = {
    ctrls: [
        {
            label: "First name",
            name: "firstName",
            type: "String",
        },
        {
            label: "Last name",
            name: "lastName",
            type: "String",
        },
    ],
    name: "first",
};

const formData = {
    firstName: "Полиграф",
    lastName: "Шариков",
    middleName: "Полиграфыч",
};

const onManager = (manager: FormBase): void => {
    const stream: IStream = manager.save({}, true);
    console.log("form manager: " + manager.name);
    console.log("data:", stream);
};

initRadon();

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <h1>This is demo application</h1>
                <RnForm descr={formDescr} data={formData} getManager={onManager} />
            </>
        );
    }
}
