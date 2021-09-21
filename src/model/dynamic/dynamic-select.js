import DynamicDefault from './dynamic-default';

export default class DynamicSelect extends DynamicDefault {
  constructor() {
    super();
    this.name = 'select';
  }

  getTemplate(h, config, props) {
    return (
      <vm-select
        value={props[this.getModel(config)]}
        v-on:input={this.setModelValue(config, props)}
        label={config.label}
        items={config.items}
      />
    );
  }
}
