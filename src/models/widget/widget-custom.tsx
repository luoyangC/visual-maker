import { h, resolveComponent } from 'vue'
import { Widget, WidgetConfig } from './index'

export class CustomWidget extends Widget {
  constructor() {
    super()
    this.name = 'custom'
    this.icon = ''
    this.label = '自定义'

    this.isDrag = false
    this.isEnum = false
  }

  getChildren(config: WidgetConfig) {
    return h(resolveComponent('VmShape'), { widget: config })
  }

  getTemplate(config: WidgetConfig) {
    const children = config.children?.map((item) => this.getChildren(item))
    return h(
      'div',
      {
        class: 'v-custom',
        style: { width: config.style.width + 'px', height: config.style.height + 'px' }
      },
      children
    )
  }

  getPreview(config: WidgetConfig) {
    const children = config.children?.map((item) => this.getWidgetPreview(item.type, item))
    return h(
      'div',
      {
        class: 'v-custom',
        style: this.getWidgetStyle(config.style)
      },
      children
    )
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'custom',
      lock: false,
      style: {
        width: 0,
        height: 0,
        minWidth: 0,
        minHeight: 0,
        opacity: 1,
        rotate: 0
      },
      props: {},
      propConfigs: [],
      children: [],
      settled: false
    }
    return config
  }
}
