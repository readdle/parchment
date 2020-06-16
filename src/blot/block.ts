import { Root, BlotConstructor } from './abstract/blot';
import FormatBlot from './abstract/format';
import Scope from '../scope';

class BlockBlot extends FormatBlot {
  static blotName = 'block';
  static scope = Scope.BLOCK_BLOT;
  static tagName = 'P';

  static formats(domNode: HTMLElement, scroll: Root): any {
    const match = scroll.query(BlockBlot.blotName);
    if (match != null && domNode.tagName === (<BlotConstructor>match).tagName) {
      return undefined;
    }
    return super.formats(domNode, scroll);
  }

  format(name: string, value: any) {
    const format = this.scroll.query(name, Scope.BLOCK);
    if (format == null) {
      return;
    } else if (name === this.statics.blotName && !value) {
      this.replaceWith(BlockBlot.blotName);
    } else {
      super.format(name, value);
    }
  }

  formatAt(index: number, length: number, name: string, value: any): void {
    if (this.scroll.query(name, Scope.BLOCK) != null) {
      this.format(name, value);
    } else {
      super.formatAt(index, length, name, value);
    }
  }

  insertAt(index: number, value: string, def?: any): void {
    if (def == null || this.scroll.query(value, Scope.INLINE) != null) {
      // Insert text or inline
      super.insertAt(index, value, def);
    } else {
      let after = this.split(index);
      const blot = this.scroll.create(value, def);
      after.parent.insertBefore(blot, after);
    }
  }

  update(mutations: MutationRecord[], context: { [key: string]: any }): void {
    if (navigator.userAgent.match(/Trident/)) {
      this.build();
    } else {
      super.update(mutations, context);
    }
  }
}

export default BlockBlot;
