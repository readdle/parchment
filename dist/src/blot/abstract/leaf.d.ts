import { Leaf } from './blot';
import ShadowBlot from './shadow';
import Scope from '../../scope';
declare class LeafBlot extends ShadowBlot implements Leaf {
    static scope: Scope;
    static value(domNode: Node): any;
    index(node: Node, offset: number): number;
    position(index: number, inclusive?: boolean): [Node, number];
    value(): any;
}
export default LeafBlot;
