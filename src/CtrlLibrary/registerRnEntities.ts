import {Rn} from '../Radon/Rn';
import {StringForProps} from './components/StringForProps';
import {PropsTable} from './components/PropsTable';
import {DummyComponent} from '../constructor/board/DummyComponent';
import {DropFrame} from '../constructor/board/DropFrame';
import {ValidatorUniqueCtrlName} from './validator/ValidatorUniqueCtrlName';

export const registerRnEntities = () => {
    Rn.reg({
        components: {
            DummyComponent,
            DropFrame,
            PropsTable,
            StringForProps,
        },
        validators: {
            UniqueCtrlName: ValidatorUniqueCtrlName,
        },
    });
};
