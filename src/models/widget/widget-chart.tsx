import { h } from 'vue'
import { Widget, WidgetConfig, WidgetConfigOptions } from './index'
import { chartHook } from '@/hooks/chart'
import { isDef } from '@/utils'

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

  getPreview(config: WidgetConfig, data: any) {
    this.setPreviewDataset(config, data)
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

  setPreviewDataset(config: WidgetConfig, data: any) {
    const chartModel = data[config.props?.chartModel]
    console.log(chartModel)
    if (config.props && config.props?.chartModel && chartModel) {
      this.setWidgetDataset(config, JSON.stringify(chartModel, null, 2))
    }
  }

  getWidgetDataset(config: WidgetConfig): string {
    if (isDef(config.subConfig?.dataset)) {
      return JSON.stringify(config.subConfig?.dataset, null, 2) || ''
    }
    return ''
  }

  setWidgetDataset(config: WidgetConfig, value: string) {
    try {
      config.subConfig && (config.subConfig.dataset = JSON.parse(value))
    } catch (error) {
      // console.log(error)
    }
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
        justifyContent: '',
        color: '',
        backgroundColor: '#fff'
      },
      props: {
        dataset: {},
        dataApi: '',
        dataModel: '',
        chartModel: ''
      },
      propConfigs: [
        {
          label: '图表模型',
          type: 'input',
          model: 'chartModel'
        }
      ],
      subtype: options.subtype,
      subConfig: chartHook.getChartConfig(options.subtype as string)
    }
    return config
  }
}
