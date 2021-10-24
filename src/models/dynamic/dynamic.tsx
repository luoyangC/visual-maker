import { WidgetDynamicConfig, LooseOptions, WidgetConfig } from '@/models/widget'

export class Dynamic {
  name: string

  constructor() {
    this.name = 'default'
  }

  getTemplate(config: WidgetDynamicConfig, props: LooseOptions, widget: WidgetConfig) {}

  getModel(config: WidgetDynamicConfig) {
    if (typeof config.model === 'string') {
      return config.model
    }
  }

  setModelValue(config: WidgetDynamicConfig, props: LooseOptions, widget?: WidgetConfig) {
    const func = (val: any) => {
      const old = props[this.getModel(config) as string]
      props[this.getModel(config) as string] = val
      config.func?.(val, old, widget)
    }
    return func
  }
}
