import Scope from '../scope';
export interface AttributorOptions {
    scope?: Scope;
    whitelist?: string[];
}
export default class Attributor {
    attrName: string;
    keyName: string;
    scope: Scope;
    whitelist: string[] | undefined;
    static keys(node: HTMLElement): string[];
    constructor(attrName: string, keyName: string, options?: AttributorOptions);
    add(node: HTMLElement, value: string): boolean;
    canAdd(node: HTMLElement, value: any): boolean;
    remove(node: HTMLElement): void;
    value(node: HTMLElement): string;
}
