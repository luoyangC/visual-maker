import DynamicDefault from './dynamic-default';

export default class DynamicInput extends DynamicDefault {
  constructor() {
    super();
    this.name = 'input';
  }

  getTemplate(h, config, props) {
    return (
      <vm-input
        value={props[this.getModel(config)]}
        v-on:input={this.setModelValue(config, props)}
        type='string'
        label={config.label}
        border={true}
      />
    );
  }
}
