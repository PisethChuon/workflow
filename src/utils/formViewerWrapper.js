import { Form } from '@bpmn-io/form-js';

export default class FormViewer {
  constructor(options) {
    this.container = options.container;
    this.schema = options.schema;
    this.instance = null;
  }

  async init() {
    if (this.instance) {
      this.instance.destroy();
    }

    this.instance = new Form();
    await this.instance.importSchema(this.schema);
    await this.instance.attachTo(this.container);
    return this.instance;
  }

  destroy() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }
}
