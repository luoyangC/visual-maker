import { h, resolveComponent } from 'vue'
import { Widget, WidgetConfig } from './index'

export class CustomWidget extends Widget {
  constructor() {
    super()
    this.name = 'custom'
    this.icon = ''
    this.label = '自定义'

    this.isDrag = false
    this.isEnum = false
  }

  getChildren(config: WidgetConfig) {
    return h(resolveComponent('VmShape'), { widget: config })
  }

  getTemplate(config: WidgetConfig) {
    const children = config.children?.map((item) => this.getChildren(item))
    return h('div', { class: 'v-custom' }, children)
  }

  getPreview(config: WidgetConfig) {
    const children = config.children?.map((item) => this.getWidgetPreview(item.type, item))
    return h('div', { class: 'v-custom' }, children)
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'custom',
      lock: false,
      style: {
        width: 0,
        height: 0,
        minWidth: 0,
        minHeight: 0,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        fontSize: 20,
        fontFamily: 'sans-serif',
        textStyles: [],
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '',
        backgroundColor: '#fff',
        backgroundImage: '',
        backgroundPosition: '',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat'
      },
      props: {},
      propConfigs: [],
      children: [],
      settled: true
    }
    return config
  }
}
