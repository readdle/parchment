import Attributor from './attributor/attributor';
import { Blot, BlotConstructor, Root } from './blot/abstract/blot';
import Scope from './scope';
export declare const BLOT_LINK_KEY = "__blot";
export interface RegistryInterface {
    create(sroll: Root, input: Node | string | Scope, value?: any): Blot;
    query(query: string | Node | Scope, scope: Scope): Attributor | BlotConstructor | null;
    register(...Definitions: any[]): any;
}
export default class Registry implements RegistryInterface {
    static find(node: Node | null, bubble?: boolean): Blot | null;
    attributes: {
        [key: string]: Attributor;
    };
    classes: {
        [key: string]: BlotConstructor;
    };
    tags: {
        [key: string]: BlotConstructor;
    };
    types: {
        [key: string]: Attributor | BlotConstructor;
    };
    create(scroll: Root, input: Node | string | Scope, value?: any): Blot;
    find(node: Node | null, bubble?: boolean): Blot | null;
    query(query: string | Node | Scope, scope?: Scope): Attributor | BlotConstructor | null;
    register(...Definitions: any[]): any;
}
