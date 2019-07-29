/**
 * Объект для функций активации разных частей конструктора
 */
export interface IActivator {
    [name: string]: () => void;
}
