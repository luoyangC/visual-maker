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

  abstract getConfig(options?: any): any

  abstract getTemplate(config?: any): any

  abstract getPreview(config?: any): any

  abstract getHtml(config?: any): any
}
