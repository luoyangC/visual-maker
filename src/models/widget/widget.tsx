import { widgetHook } from '@/hooks/widget'
import { isDef } from '@/utils'
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

  abstract getPreview(config?: WidgetConfig): VNode

  getWidget(name: string) {
    return widgetHook.getWidget(name)
  }

  getWidgetConfig(name: string, options: WidgetConfigOptions): WidgetConfig {
    return widgetHook.getWidgetConfig(name, options)
  }

  getWidgetTemplate(name: string, config: WidgetConfig) {
    return widgetHook.getWidgetTemplate(name, config)
  }

  getWidgetPreview(name: string, config: WidgetConfig) {
    return widgetHook.getWidgetPreview(name, config)
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

    return result
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
