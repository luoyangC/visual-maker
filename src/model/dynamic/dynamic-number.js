import DynamicDefault from './dynamic-default';

export default class DynamicNumber extends DynamicDefault {
  constructor() {
    super();
    this.name = 'number';
  }

  getTemplate(h, config, props, obj) {
    return (
      <vm-input-number
        value={props[this.getModel(config)]}
        v-on:input={this.setModelValue(config, props, obj)}
        label={config.label}
        border={true}
      />
    );
  }
}
