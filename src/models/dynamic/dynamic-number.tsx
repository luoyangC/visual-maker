import { WidgetDynamicConfig, LooseOptions, WidgetConfig } from '@/models/widget'
import { h, resolveComponent } from 'vue'
import { Dynamic } from './dynamic'

export class NumberDynamic extends Dynamic {
  constructor() {
    super()
    this.name = 'number'
  }

  getTemplate(config: WidgetDynamicConfig, props: LooseOptions, widget: WidgetConfig) {
    if (!this.checkDisplay(config, props, widget)) {
      return ''
    }
    return h(resolveComponent('vmInputNumber'), {
      modelValue: props[this.getModel(config) as string],
      label: config.label,
      border: true,
      'onUpdate:modelValue': this.setModelValue(config, props, widget)
    })
  }
}
