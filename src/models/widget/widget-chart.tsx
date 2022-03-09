import { h } from 'vue'
import { Widget, WidgetConfig, WidgetConfigOptions } from './index'
import { chartHook } from '@/hooks/chart'

export class ChartWidget extends Widget {
  constructor() {
    super()
    this.name = 'chart'
    this.icon = 'chart'
    this.label = '图表'

    this.isDrag = false
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    return h(
      'div',
      {
        class: 'v-chart',
        style: { ...this.getWidgetStyle(config.style) },
        src: config.props?.src
      },
      chartHook.getChartTemplate(config.subtype as string, config)
    )
  }

  getPreview(config: WidgetConfig) {
    return h(
      'div',
      {
        class: 'v-chart',
        style: { ...this.getWidgetStyle(config.style) },
        src: config.props?.src
      },
      chartHook.getChartPreview(config.subtype as string, config)
    )
  }

  getConfig(options: WidgetConfigOptions) {
    const config: WidgetConfig = {
      type: 'chart',
      lock: false,
      style: {
        width: 400,
        height: 400,
        minWidth: 50,
        minHeight: 50,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        textAlign: '',
        color: '',
        backgroundColor: '#fff'
      },
      subtype: options.subtype,
      subConfig: chartHook.getChartConfig(options.subtype as string)
    }
    return config
  }
}
