import { h, resolveComponent } from 'vue'
import { Chart } from './index'

export class LineChart extends Chart {
  constructor() {
    super()
    this.name = 'line'
    this.icon = 'line'
    this.label = '折线图'

    this.isDrag = true
    this.isEnum = false
  }

  getHtml(config: any) {}

  getTemplate(config: any) {
    return h(resolveComponent('VmChart'), { class: 'v-chart', option: config })
  }

  getPreview(config?: any) {
    return h(resolveComponent('VmChart'), { class: 'v-chart', option: config })
  }

  getConfig() {
    return {
      title: { text: '用户增量' },
      tooltip: {},
      xAxis: {
        data: ['12-3', '12-4', '12-5', '12-6', '12-7', '12-8']
      },
      yAxis: {},
      series: [
        {
          name: '用户量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
  }
}
