import {ConMaster} from '../ConMaster';

let glbKey: number = 0;

export abstract class CmdBase {
    public key: number;
    constructor() {
        this.key = ++glbKey;
    }
    /**
     * Создание обратной команды. Например, для вставки обратное действие - удаление.
     * @return {CmdBase}
     */
    abstract createUndo(): CmdBase;

    /**
     * Выполнение команды. Манипуляции с мастером
     */
    abstract exec(): void;

    /**
     * Название операции
     * @return {string}
     */
    abstract getMessage(): string;
    /**
     * Позволяет склеить несколько однотипных команд в одну. Например, ввод текста не по отдельному символу.
     * @param {CmdBase} cmd
     * @return {boolean} Если true, значит склеивание произошло
     */
    public tryMerge(cmd: CmdBase): boolean {
        return false;
    }
    protected get master():ConMaster  {
        return ConMaster.get();
    }
}
