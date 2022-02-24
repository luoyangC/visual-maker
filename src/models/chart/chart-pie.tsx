import { h, resolveComponent } from 'vue'
import { WidgetConfig } from '../widget'
import { Chart, ChartOption } from './index'

export class PieChart extends Chart {
  constructor() {
    super()
    this.name = 'pie'
    this.icon = 'pie'
    this.label = '饼图'

    this.isDrag = true
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    return h(resolveComponent('VmChart'), { class: 'v-chart', option: config.subConfig })
  }

  getPreview(config: WidgetConfig) {
    return h(resolveComponent('VmChart'), { class: 'v-chart', option: config.subConfig })
  }

  getConfig() {
    return {
      title: {
        show: true,
        text: '销售占比'
      },
      legend: {
        show: true
      },
      tooltip: {
        show: true,
        trigger: 'item'
      },
      series: [
        {
          type: 'pie'
        }
      ],
      dataset: {
        // 提供一份数据。
        source: [
          ['类型', '销量'],
          ['Milk', 73.4],
          ['Cocoa', 69.2],
          ['Brownie', 83.9]
        ]
      }
    }
  }
}
