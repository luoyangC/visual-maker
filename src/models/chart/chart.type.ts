export interface LooseOptions {
  [x: string]: any
}

export interface TitleOption {
  show: boolean
  text: string
}

export interface legendOption {
  show: boolean
  left?: string | number
  top?: string | number
  right?: string | number
  bottom?: string | number
  data?: Array<string>
}

export interface TooltipOption {
  show: boolean
  trigger?: string
}

export interface AxisOption {
  show?: boolean
  type?: string
  name?: string
}

export interface DatasetOption {
  source: Array<Array<any>>
}

export interface SeriesOption {
  type: string
}

export interface ChartOption {
  title?: TitleOption
  legend?: legendOption
  tooltip?: TooltipOption
  xAxis?: AxisOption
  yAxis?: AxisOption
  dataset?: DatasetOption
  series?: Array<SeriesOption>
}
