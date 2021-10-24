import { WidgetDynamicConfig, LooseOptions, WidgetConfig } from '@/models/widget'
import { h, resolveComponent } from 'vue'
import { Dynamic } from './dynamic'

export class SelectDynamic extends Dynamic {
  constructor() {
    super()
    this.name = 'select'
  }

  getTemplate(config: WidgetDynamicConfig, props: LooseOptions, widget: WidgetConfig) {
    return h(resolveComponent('vmSelect'), {
      modelValue: props[this.getModel(config) as string],
      label: config.label,
      items: config.items,
      'onUpdate:modelValue': this.setModelValue(config, props, widget)
    })
  }
}
