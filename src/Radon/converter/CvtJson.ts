import {CvtBase} from './CvtBase';
import {IStream} from '../types';

export class CvtJson extends CvtBase {
    public read(stream: IStream): IStream {
        const {name} = this.ctrl;
        if (!name) {
            return;
        }
        if (name in stream) {
            const srcValue = stream[name];
            try {
                stream[name] = JSON.stringify(srcValue);
            } catch (e) {
            }
        }
        return stream;
    }

    public write(stream: IStream): void {
        const {name} = this.ctrl;
        if (!name) {
            return;
        }
        if (name in stream) {
            try {
                const strValue = stream[name];
                stream[name] = JSON.parse(strValue);
            } catch (e) {
            }
        }
    }
}