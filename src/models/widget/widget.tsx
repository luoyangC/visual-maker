import { getDataModel } from '@/api'
import { widgetHook } from '@/hooks/widget'
import { isDef, isUndefined } from '@/utils'
import { VNode } from 'vue'
import { LooseOptions, WidgetConfigOptions, WidgetConfig } from '.'

export abstract class Widget {
  name: string
  icon?: string
  label?: string

  isDrag: boolean
  isEnum: boolean

  constructor() {
    this.name = 'default'
    this.isDrag = false
    this.isEnum = false
  }
  abstract getConfig(options?: WidgetConfigOptions): WidgetConfig

  abstract getTemplate(config?: WidgetConfig): VNode

  abstract getPreview(config?: WidgetConfig, data?: any): VNode

  getWidget(name: string) {
    return widgetHook.getWidget(name)
  }

  getWidgetConfig(name: string, options: WidgetConfigOptions): WidgetConfig {
    return widgetHook.getWidgetConfig(name, options)
  }

  getWidgetTemplate(name: string, config: WidgetConfig) {
    return widgetHook.getWidgetTemplate(name, config)
  }

  getWidgetPreview(name: string, config: WidgetConfig, data: any) {
    return widgetHook.getWidgetPreview(name, config, data)
  }

  getWidgetStyle(style?: LooseOptions, config?: WidgetConfig) {
    const result = { ...style }
    if (!isNaN(result.width)) {
      result.width += 'px'
    }
    if (!isNaN(result.height)) {
      result.height += 'px'
    }
    if (!isNaN(result.minWidth)) {
      result.minWidth += 'px'
    }
    if (!isNaN(result.minHeight)) {
      result.minHeight += 'px'
    }
    if (!isNaN(result.top)) {
      result.top += 'px'
    }
    if (!isNaN(result.left)) {
      result.left += 'px'
    }
    if (!isNaN(result.fontSize)) {
      result.fontSize += 'px'
    }
    if (isDef(result.textStyles)) {
      result.fontWeight = 500
      result.fontStyle = 'normal'
      result.textDecoration = ''
      if ((result.textStyles as Array<string>).includes('bold')) {
        result.fontWeight = 700
      }
      if ((result.textStyles as Array<string>).includes('italic')) {
        result.fontStyle = 'italic'
      }
      if ((result.textStyles as Array<string>).includes('underline')) {
        result.textDecoration += 'underline '
      }
      if ((result.textStyles as Array<string>).includes('line-through')) {
        result.textDecoration += 'line-through '
      }
    }

    this.onStyleRepaint(config)

    return this.getCustomStyle(result, config)
  }

  getCustomStyle(style?: LooseOptions, config?: WidgetConfig) {
    return style
  }

  getWidgetData(config: WidgetConfig) {
    if (config.props?.dataApi && config.props?.dataModel) {
      return getDataModel(config.props.dataApi, config.props.dataModel)
    }
    return config.props?.dataset || {}
  }

  getWidgetDataset(config: WidgetConfig) {
    if (isDef(config.props?.dataset)) {
      return JSON.stringify(config.props?.dataset, null, 2) || '{}'
    }
    return '{}'
  }

  setWidgetDataset(config: WidgetConfig, value: string) {
    try {
      config.props && (config.props.dataset = JSON.parse(value))
    } catch (error) {
      // console.log(error)
    }
  }

  getPreviewModel(model: string, data: any, config?: WidgetConfig): string {
    const strArray: Array<string> = model.split('')
    const results = model.matchAll(/\$\{([\w|\.]*)\}/g)
    for (const item of results) {
      const index = item.index as number
      Array.from({ length: item[0].length }).forEach((_, i) => {
        if (i === 0) {
          strArray[index] = this.getPreviewData(item[1], data)
        } else {
          strArray[index + i] = ''
        }
      })
    }
    return strArray.join('')
  }

  getPreviewData(name: string, data: any): string {
    let res = data
    const getNameValue = (name: string, data: any): any => {
      if (isUndefined(data[name]) && data._scope) {
        return getNameValue(name, data._scope)
      }
      return data[name]
    }
    for (const key of name.split('.')) {
      res = getNameValue(key, res)
      if (res === undefined) break
    }
    return res
  }

  onStyleRepaint(config?: WidgetConfig) {}

  pushSlotToChildren(config: WidgetConfig, options?: WidgetConfigOptions) {
    const slotConfig = this.getWidgetConfig('slot', { ...options, parent: config })
    slotConfig.parent = config
    config.children?.push(slotConfig)
  }

  popSlotFromChildren(config: WidgetConfig) {
    config.children?.pop()
  }

  preventDefault(e: Event) {
    e.preventDefault()
  }

  stopPropagation(e: Event) {
    e.stopPropagation()
  }

  buildStyleString(styles: LooseOptions): string {
    let styleStr = ''
    for (const key in styles) {
      if (styles[key] && key !== 'textStyles') {
        styleStr += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${styles[key]};`
      }
    }
    return styleStr
  }
}
