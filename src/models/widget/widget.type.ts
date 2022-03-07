import type { ChartOption } from '../chart'

export interface LooseOptions {
  [x: string]: any
}

export interface WidgetDynamicConfig {
  label: string
  type: string
  model: string
  show?: Function
  func?: Function
  items?: Array<any>
}

export interface WidgetConfig {
  id?: number
  type: string
  lock: boolean // 锁定，是否可编辑
  settled?: boolean // 固定内容
  virtual?: boolean // 虚拟组件

  style: LooseOptions

  attrs?: LooseOptions
  attrConfigs?: Array<WidgetDynamicConfig>
  props?: LooseOptions
  propConfigs?: Array<WidgetDynamicConfig>

  parent?: WidgetConfig | null
  children?: Array<WidgetConfig>

  subtype?: string
  subConfig?: ChartOption
}

export interface WidgetConfigOptions {
  slotType?: string
  settled?: boolean
  subtype?: string

  style?: LooseOptions
  attrs?: LooseOptions
  props?: LooseOptions
  parent?: WidgetConfig | null
}
