import { Widget, WidgetConfig, WidgetConfigOptions } from './index'
import { chartHook } from '@/hooks/chart'
import { ChartOption } from '../chart'

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
    return chartHook.getChartTemplate(config.subtype as string, config)
  }

  getPreview(config: WidgetConfig) {
    return chartHook.getChartPreview(config.subtype as string, config)
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
      props: {
        dataset: {}
      },
      propConfigs: [
        {
          label: '数据集',
          type: 'dataset',
          model: 'dataset'
        }
      ],
      subtype: options.subtype,
      subConfig: chartHook.getChartConfig(options.subtype as string)
    }
    config.subConfig && (config.subConfig.style = config.style)
    return config
  }
}
