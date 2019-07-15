import {CvtBase} from './CvtBase';
import {IStream} from '../types';

export class CvtNumber extends CvtBase {
    public write(stream: IStream): void {
        const value: number = +stream[this.name];
        if (isNaN(value)) {
            delete stream[this.name];
        } else {
            stream[this.name] = value;
        }
    }
}