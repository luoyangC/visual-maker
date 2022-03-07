import { h, resolveComponent } from 'vue'
import { Widget, WidgetConfig, WidgetConfigOptions } from '.'

export class SlotWidget extends Widget {
  constructor() {
    super()
    this.name = 'slot'
    this.isDrag = false
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    return h(resolveComponent('VmSlot'), { class: 'v-slot', widget: config })
  }

  getPreview(config: WidgetConfig) {
    const templates = config.children?.map((item) => this.getWidgetPreview(item.type, item))
    return h('div', { class: 'v-slot' }, templates)
  }

  getConfig(options: WidgetConfigOptions) {
    const config: WidgetConfig = {
      type: 'slot',
      lock: true,
      settled: options?.settled,
      style: {
        ...options?.style
      },
      attrs: {
        ...options?.attrs
      },
      props: {
        ...options?.props
      },
      parent: options.parent,
      children: []
    }
    if (options.slotType) {
      const slotConfig = this.getWidgetConfig(options.slotType, { ...options, parent: config })
      config.children?.push(slotConfig)
    }
    return config
  }
}
