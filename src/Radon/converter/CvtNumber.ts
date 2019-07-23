import {IStream} from "../types";
import {CvtBase} from "./CvtBase";

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
