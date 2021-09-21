import dynamics from '@/model/dynamic';

class DynamicHook {
  constructor() {
    this.models = {};
  }

  getDynamic(name) {
    return this.models[name] || this.models['default'];
  }

  newDynamic(Model) {
    const el = new Model();

    this.models[el.name] = el;
    return el;
  }
}

const instance = new DynamicHook();

Object.keys(dynamics).forEach((key) => {
  instance.newDynamic(dynamics[key]);
});

export default instance;
