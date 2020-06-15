import AttributorStore from '../../attributor/store';
import { Blot, Parent, Formattable, Root } from './blot';
import ContainerBlot from './container';
declare class FormatBlot extends ContainerBlot implements Formattable {
    protected attributes: AttributorStore;
    static formats(domNode: HTMLElement, scroll: Root): any;
    constructor(scroll: Root, domNode: Node);
    format(name: string, value: any): void;
    formats(): {
        [index: string]: any;
    };
    replaceWith(name: string | Blot, value?: any): Blot;
    update(mutations: MutationRecord[], context: {
        [key: string]: any;
    }): void;
    wrap(name: string | Parent, value?: any): Parent;
}
export default FormatBlot;
