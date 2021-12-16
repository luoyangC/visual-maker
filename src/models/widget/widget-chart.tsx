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

  getHtml(config: WidgetConfig) {
    return {
      tag: 'div',
      type: 'chart',
      props: {
        class: 'v-chart',
        style: this.getWidgetStyle(config.style)
      },
      default: config.props?.value
    }
  }

  getTemplate(config: WidgetConfig) {
    return config.subtype && chartHook.getChartTemplate(config.subtype, config.subConfig)
  }

  getPreview(config: WidgetConfig) {
    return config.subtype && chartHook.getChartPreview(config.subtype, config.subConfig)
  }

  getConfig(options: WidgetConfigOptions) {
    const config: WidgetConfig = {
      type: 'chart',
      lock: false,
      style: {
        width: 300,
        height: 200,
        minWidth: 50,
        minHeight: 50,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        textAlign: '',
        color: '',
        backgroundColor: '#fff'
      },
      props: {},
      propConfigs: [],
      subtype: options.subtype,
      subConfig: chartHook.getChartConfig(options.subtype as string)
    }
    return config
  }
}
