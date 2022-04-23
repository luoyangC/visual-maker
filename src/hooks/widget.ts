import type { Widget, WidgetConfig, WidgetConfigOptions } from '@/models/widget'
import { widgets } from '@/models/widget'
import { generateID } from '@/utils'
import { getExampleInfo } from '@/api'

type WidgetKeys = keyof typeof widgets

type InstantiableClass<T extends Widget> = {
  new (): T
}

type WidgetModel = InstantiableClass<Widget>

type WidgetConfigKeys = keyof WidgetConfig

const excKeys: Array<WidgetConfigKeys> = ['parent', 'propConfigs', 'attrConfigs']

class WidgetHook {
  widgetMap: Map<string, InstanceType<WidgetModel>>
  dragTypeList: Array<{ type: string; icon?: string; label?: string }>
  previewData: any

  constructor() {
    this.widgetMap = new Map()
    this.dragTypeList = []
    this.previewData = {}
  }

  getDragTypeList() {
    return this.dragTypeList
  }

  getWidget(name: string) {
    return this.widgetMap.get(name) as InstanceType<WidgetModel>
  }

  getWidgetConfig(name: string, options?: WidgetConfigOptions) {
    const id = generateID()
    const config = this.getWidget(name).getConfig(options)
    config.id = id
    return config
  }

  getWidgetTemplate(name: string, config: WidgetConfig) {
    const template = this.getWidget(name).getTemplate(config)
    return template
  }

  getWidgetPreview(name: string, config: WidgetConfig, data: any = this.previewData) {
    const _data: any = this.getWidget(name).getWidgetData(config)
    Object.assign(data, _data)
    const preview: any = this.getWidget(name).getPreview(config, data)
    if (preview.props && preview.props.class) {
      const isAbsolute = config.parent?.type === 'custom' || !config.settled
      preview.props.class += isAbsolute ? ' g-pos--a' : ' g-pos--r'
    }
    if (preview.props && preview.props.style && config.style?.rotate) {
      preview.props.style.transform = `rotate(${config.style?.rotate}deg)`
    }
    return preview
  }

  async getWidgetExample(exampleId: string) {
    const exampleInfo = await getExampleInfo(exampleId)
    return this.jsonToWidget(exampleInfo?.option)
  }

  newWidget(Widget: WidgetModel) {
    const el = new Widget()

    this.widgetMap.set(el.name, el)
    if (el.isDrag) {
      this.dragTypeList.push({
        type: el.name,
        icon: el.icon,
        label: el.label
      })
    }
    return el
  }

  jsonToWidget(json: any, parent?: any) {
    const result: any = this.getWidgetConfig(json.type, json)

    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        if (key === 'children') {
          result[key] = json.children?.map((item: any) => this.jsonToWidget(item, result))
        } else {
          result[key] = json[key]
        }
      }
    }

    result.id = generateID()
    result.parent = parent
    return result
  }

  widgetToJson(widget: WidgetConfig, excludes: Array<WidgetConfigKeys> = excKeys) {
    const result: any = {}
    for (const key in widget) {
      if (Object.prototype.hasOwnProperty.call(widget, key)) {
        if (excludes.includes(key as WidgetConfigKeys)) {
          continue
        } else if (key === 'children') {
          result[key] = widget.children?.map((item) => this.widgetToJson(item))
        } else {
          result[key] = widget[key as WidgetConfigKeys]
        }
      }
    }
    return result
  }
}

export const widgetHook = new WidgetHook()

Object.keys(widgets).forEach((key: string) => {
  widgetHook.newWidget(widgets[key as WidgetKeys])
})
