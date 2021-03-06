import Attributor from '../../attributor/attributor';
import AttributorStore from '../../attributor/store';
import { Blot, BlotConstructor, Parent, Formattable, Root } from './blot';
import ContainerBlot from './container';
import ShadowBlot from './shadow';
import Scope from '../../scope';

class FormatBlot extends ContainerBlot implements Formattable {
  protected attributes: AttributorStore;

  static formats(domNode: HTMLElement, scroll: Root): any {
    if (typeof this.tagName === 'string') {
      return true;
    } else if (Array.isArray(this.tagName)) {
      return domNode.tagName.toLowerCase();
    }
    return undefined;
  }

  constructor(scroll: Root, domNode: Node) {
    super(scroll, domNode);
    this.attributes = new AttributorStore(this.domNode);
  }

  format(name: string, value: any): void {
    let format = this.scroll.query(name);
    if (format instanceof Attributor) {
      this.attributes.attribute(format, value);
    } else if (value) {
      if (name !== this.statics.blotName || this.formats()[name] !== value) {
        this.replaceWith(name, value);
      }
    }
  }

  formats(): { [index: string]: any } {
    let formats = this.attributes.values();
    let format = this.statics.formats(this.domNode, this.scroll);
    if (format != null) {
      formats[this.statics.blotName] = format;
    }
    return formats;
  }

  replaceWith(name: string | Blot, value?: any): Blot {
    let replacement = <FormatBlot>super.replaceWith(name, value);
    this.attributes.copy(replacement);
    return replacement;
  }

  update(mutations: MutationRecord[], context: { [key: string]: any }): void {
    super.update(mutations, context);
    if (
      mutations.some(mutation => {
        return mutation.target === this.domNode && mutation.type === 'attributes';
      })
    ) {
      this.attributes.build();
    }
  }

  wrap(name: string | Parent, value?: any): Parent {
    let wrapper = super.wrap(name, value);
    if (wrapper instanceof FormatBlot && wrapper.statics.scope === this.statics.scope) {
      this.attributes.move(wrapper);
    }
    return wrapper;
  }
}

export default FormatBlot;
