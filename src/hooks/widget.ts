import type { Widget, WidgetConfigOptions } from '@/models/widget'
import { widgets } from '@/models/widget'
import { generateID } from '@/utils'

type WidgetKeys = keyof typeof widgets
type WidgetModel = typeof Widget

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
}

export const widgetHook = new WidgetHook()

Object.keys(widgets).forEach((key: string) => {
  widgetHook.newWidget(widgets[key as WidgetKeys])
})
