import { h, resolveComponent } from 'vue'
import { Chart } from './index'

export class BarChart extends Chart {
  constructor() {
    super()
    this.name = 'bar'
    this.icon = 'pillar'
    this.label = '柱状图'

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
      title: { text: '销售量' },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27]
        }
      ]
    }
  }
}
