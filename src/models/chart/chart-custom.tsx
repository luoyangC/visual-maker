import { h, resolveComponent } from 'vue'
import { WidgetConfig } from '../widget'
import { Chart } from './index'

export class CustomChart extends Chart {
  constructor() {
    super()
    this.name = 'custom'
    this.icon = 'custom'
    this.label = '自定义'

    this.isDrag = false
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    return h(resolveComponent('VmChart'), {
      class: 'v-chart',
      option: config.subConfig,
      height: config.style.height,
      width: config.style.width
    })
  }

  getPreview(config: WidgetConfig) {
    return h(resolveComponent('VmChart'), {
      class: 'v-chart',
      option: config.subConfig,
      height: config.style.height,
      width: config.style.width
    })
  }

  getConfig() {
    return {}
  }
}
