import { h, resolveComponent } from 'vue'
import { WidgetConfig } from '../widget'
import { Chart, ChartOption } from './index'

export class LineChart extends Chart {
  constructor() {
    super()
    this.name = 'line'
    this.icon = 'line'
    this.label = '折线图'

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
        text: '销售额'
      },
      legend: {
        show: true,
        data: ['2021', '2022']
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        show: true,
        type: 'category',
        name: '类型'
      },
      yAxis: {
        show: true,
        type: 'value'
      },
      series: [
        { name: '2021', type: 'line' },
        { name: '2022', type: 'line' }
      ],
      dataset: {
        // 提供一份数据。
        source: [
          ['销售额', '2021', '2022'],
          ['Milk', 63.1, 73.4],
          ['Cocoa', 66.4, 69.2],
          ['Brownie', 52.4, 83.9]
        ]
      }
    }
  }
}
