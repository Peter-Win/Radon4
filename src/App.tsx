import * as React from 'react';
import {initRadon} from './Radon/initRadon';
import {DemoForm} from './components/DemoForm';
import './styles/common.css';
import {PropsTableDemo} from './CtrlLibrary/components/PropsTableDemo';

import {DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {ConstructorFrame} from './constructor/ConstructorFrame';
import {CtrlLibrary} from './CtrlLibrary/CtrlLibrary';

initRadon();
CtrlLibrary.init();

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <ConstructorFrame />
            </DndProvider>
        );
    }
}
