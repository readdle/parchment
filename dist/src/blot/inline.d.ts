import { Root } from './abstract/blot';
import FormatBlot from './abstract/format';
import Scope from '../scope';
declare class InlineBlot extends FormatBlot {
    static blotName: string;
    static scope: Scope;
    static tagName: string;
    static formats(domNode: HTMLElement, scroll: Root): any;
    format(name: string, value: any): void;
    formatAt(index: number, length: number, name: string, value: any): void;
    optimize(context: {
        [key: string]: any;
    }): void;
}
export default InlineBlot;
