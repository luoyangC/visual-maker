import { WidgetDynamicConfig, LooseOptions, WidgetConfig } from '@/models/widget'
import { h, resolveComponent } from 'vue'
import { Dynamic } from './dynamic'

export class DatasetDynamic extends Dynamic {
  constructor() {
    super()
    this.name = 'dataset'
  }

  getTemplate(config: WidgetDynamicConfig, props: LooseOptions, widget: WidgetConfig) {
    if (!this.checkDisplay(config, props, widget)) {
      return ''
    }
    return h(resolveComponent('vmJsonEditor'), {
      modelValue: props[this.getModel(config) as string],
      label: config.label,
      'onUpdate:modelValue': this.setModelValue(config, props, widget)
    })
  }
}
