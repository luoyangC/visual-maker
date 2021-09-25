import { isFunction } from '@/utils/type';

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

  setModelValue(config, props, obj) {
    const func = (val) => {
      const old = props[this.getModel(config)];
      props[this.getModel(config)] = val;
      isFunction(config.func) && config.func(val, old, obj);
    };
    return func;
  }
}
