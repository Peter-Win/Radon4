import {IDescrUsefulCtrl} from './IDescrUsefulCtrl';
import {IDescrCtrl} from '../Radon/descr/IDescrCtrl';

export class UsefulCtrl {
    public constructor(private descr: IDescrUsefulCtrl) {
    }
    public get name(): string {
        return this.descr.name;
    }
    public getPropsDescr(): IDescrCtrl[] {
        return this.descr.props;
    }
    public getLabel(): string {
        return this.descr.label;
    }
    public getPartition(): string {
        return this.descr.partition;
    }
    public getType(): string {
        return this.descr.name;
    }
    public getIcon(): string {
        return this.descr.icon;
    }
}
