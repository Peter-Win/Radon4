/**
 * Палитра контроллеров
 */
import * as React from "react";
import {BoxWithHandle} from './BoxWithHandle';
import {CtrlLibrary} from '../CtrlLibrary/CtrlLibrary';

export const Palette: React.FC<{}> = (params) => (
    <div className="con-palette-box">
        <h2>Library</h2>
        {
            CtrlLibrary.list
                .filter((usefulCtrl) => !!usefulCtrl.getPartition()) // игнорировать абстрактные контролы
                .map((usefulCtrl) => <BoxWithHandle key={usefulCtrl.name} usefulCtrl={usefulCtrl} />)
        }
    </div>
);
