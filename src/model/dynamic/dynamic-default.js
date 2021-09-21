export default class DynamicDefault {
  constructor() {
    this.name = 'default';
  }

  getTemplate() {}

  getModel(config) {
    if (typeof config.model === 'string') {
      return config.model;
    }
  }

  setModelValue(config, props) {
    const func = (val) => {
      props[this.getModel(config)] = val;
    };
    return func;
  }
}
