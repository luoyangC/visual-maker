import type { WidgetConfig } from '@/models/widget'

type WidgetKeys = keyof WidgetConfig

const excKeys: Array<WidgetKeys> = ['parent', 'propConfigs', 'attrConfigs']

export function widgetToJson(widget: WidgetConfig, excludes: Array<WidgetKeys> = excKeys) {
  const result: any = {}
  for (const key in widget) {
    if (Object.prototype.hasOwnProperty.call(widget, key)) {
      if (excludes.includes(key as WidgetKeys)) {
        continue
      } else if (key === 'children') {
        result[key] = widget.children?.map((item) => widgetToJson(item))
      } else {
        result[key] = widget[key as WidgetKeys]
      }
    }
  }
  return result
}
