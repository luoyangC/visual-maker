import { h, resolveComponent } from 'vue'
import { Chart } from './index'

export class PieChart extends Chart {
  constructor() {
    super()
    this.name = 'pie'
    this.icon = 'pie'
    this.label = '饼图'

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
      title: { text: '访问量' },
      tooltip: {},
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: '直接访问'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 1548,
              name: '搜索引擎'
            }
          ]
        }
      ]
    }
  }
}
