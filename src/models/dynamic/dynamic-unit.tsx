import { WidgetDynamicConfig, LooseOptions, WidgetConfig } from '@/models/widget'
import { h, resolveComponent } from 'vue'
import { Dynamic } from './dynamic'

export class UnitDynamic extends Dynamic {
  constructor() {
    super()
    this.name = 'unit'
  }

  getTemplate(config: WidgetDynamicConfig, props: LooseOptions, widget: WidgetConfig) {
    if (!this.checkDisplay(config, props, widget)) {
      return ''
    }
    return h(resolveComponent('vmInputUnit'), {
      modelValue: props[this.getModel(config) as string],
      label: config.label,
      border: true,
      unitTypeList: config?.items,
      'onUpdate:modelValue': this.setModelValue(config, props, widget)
    })
  }
}
