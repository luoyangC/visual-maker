import { h, resolveComponent } from 'vue'
import { Widget, WidgetConfig, WidgetConfigOptions } from '.'

export class SlotWidget extends Widget {
  constructor() {
    super()
    this.name = 'slot'
    this.isDrag = false
    this.isEnum = false
  }

  getSlotStyle(config: WidgetConfig) {
    return {
      width: config.style.width + 'px',
      height: config.style.height + 'px'
    }
  }

  getTemplate(config: WidgetConfig) {
    return h(resolveComponent('VmSlot'), {
      class: 'v-slot',
      widget: config,
      style: this.getSlotStyle(config)
    })
  }

  getPreview(config: WidgetConfig, data: any) {
    const templates = config.children?.map((item) => this.getWidgetPreview(item.type, item, data))
    return h('div', { class: 'v-slot' }, templates)
  }

  getConfig(options: WidgetConfigOptions) {
    const config: WidgetConfig = {
      type: 'slot',
      lock: true,
      fixed: options?.fixed,
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
