import {Rn} from '../Radon/Rn';
import {StringForProps} from './components/StringForProps';
import {PropsTable} from './components/PropsTable';
import {DummyComponent} from '../constructor/DummyComponent';
import {DropFrame} from '../constructor/DropFrame';

export const registerRnEntities = () => {
    Rn.reg({
        components: {
            DummyComponent,
            DropFrame,
            PropsTable,
            StringForProps,
        }
    });
};
