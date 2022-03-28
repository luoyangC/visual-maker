import type { Widget, WidgetConfig, WidgetConfigOptions } from '@/models/widget'
import { widgets } from '@/models/widget'
import { generateID } from '@/utils'
import { getExampleInfo } from '@/api'

type WidgetKeys = keyof typeof widgets

type InstantiableClass<T extends Widget> = {
  new (): T
}

type WidgetModel = InstantiableClass<Widget>

class WidgetHook {
  widgetMap: Map<string, InstanceType<WidgetModel>>
  dragTypeList: Array<{ type: string; icon?: string; label?: string }>

  constructor() {
    this.widgetMap = new Map()
    this.dragTypeList = []
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

  getWidgetPreview(name: string, config: WidgetConfig) {
    const preview: any = this.getWidget(name).getPreview(config)
    if (preview.props && preview.props.class) {
      preview.props.class += config.settled ? ' g-pos--r' : ' g-pos--a'
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

  getDragTypeList() {
    return this.dragTypeList
  }

  jsonToWidget(json: any, parent?: any) {
    const result: any = {}
    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        if (key === 'children') {
          result[key] = json.children?.map((item: any) => this.jsonToWidget(item, json))
        } else {
          result[key] = json[key as WidgetKeys]
        }
      }
    }
    if (parent) {
      result.parent = parent
    }
    result.propConfigs = this.getWidgetConfig(json.type).propConfigs
    result.attrConfigs = this.getWidgetConfig(json.type).attrConfigs
    return result
  }
}

export const widgetHook = new WidgetHook()

Object.keys(widgets).forEach((key: string) => {
  widgetHook.newWidget(widgets[key as WidgetKeys])
})
