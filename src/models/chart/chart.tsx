import { VNode } from 'vue'
import { ChartOption } from '.'
import { WidgetConfig } from '../widget'

export abstract class Chart {
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

  abstract getConfig(): ChartOption

  abstract getTemplate(config?: WidgetConfig): VNode

  abstract getPreview(config?: WidgetConfig): VNode
}
