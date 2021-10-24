import { WidgetDynamicConfig, LooseOptions, WidgetConfig } from '@/models/widget'
import { h, resolveComponent } from 'vue'
import { Dynamic } from './dynamic'

export class InputDynamic extends Dynamic {
  constructor() {
    super()
    this.name = 'input'
  }

  getTemplate(config: WidgetDynamicConfig, props: LooseOptions, widget: WidgetConfig) {
    return h(resolveComponent('vmInput'), {
      modelValue: props[this.getModel(config) as string],
      label: config.label,
      type: 'string',
      border: true,
      'onUpdate:modelValue': this.setModelValue(config, props, widget)
    })
  }
}
