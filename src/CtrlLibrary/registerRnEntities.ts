import {Rn} from '../Radon/Rn';
import {StringForProps} from './components/StringForProps';
import {PropsTable} from './components/PropsTable';
import {DummyComponent} from '../constructor/board/DummyComponent';
import {DropFrame} from '../constructor/board/DropFrame';
import {ValidatorUniqueCtrlName} from './validator/ValidatorUniqueCtrlName';
import {TextForProps} from './components/TextForProps';
import {DropListForProps} from './components/DropListForProps';
import {CtrlDropListDummy} from './CtrlDropListDummy';

export const registerRnEntities = () => {
    Rn.reg({
        components: {
            DummyComponent,
            DropFrame,
            DropListForProps,
            PropsTable,
            StringForProps,
            TextForProps,
        },
        ctrls: {
            DropListDummy: CtrlDropListDummy,
        },
        validators: {
            UniqueCtrlName: ValidatorUniqueCtrlName,
        },
    });
};
