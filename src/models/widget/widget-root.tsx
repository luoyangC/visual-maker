import { h } from 'vue'
import { PAGE_SCHEMA_TYPES } from '@/constant/dict'
import { Widget, WidgetConfig } from '.'

export class RootWidget extends Widget {
  constructor() {
    super()
    this.name = 'root'
    this.isDrag = false
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    const template = this.getWidgetTemplate('slot', config?.children?.[0] as WidgetConfig)
    return h('div', { class: 'v-root', style: this.getWidgetStyle(config.style) }, [template])
  }

  getPreview(config: WidgetConfig, data: any) {
    const template = this.getWidgetPreview('slot', config?.children?.[0] as WidgetConfig, data)
    return h('div', { class: 'v-root', style: this.getWidgetStyle(config.style) }, [template])
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'root',
      lock: true,
      style: {
        width: 1000,
        height: 800,
        opacity: 1,
        overflow: 'hidden',
        fontSize: 20,
        lineHeight: 1.5,
        fontFamily: 'sans-serif',
        color: '',
        backgroundColor: '#fff',
        backgroundImage: '',
        backgroundPosition: '',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat'
      },
      props: {
        dataset: {},
        dataApi: '',
        dataModel: ''
      },
      propConfigs: [],
      parent: null,
      children: [],
      settled: false
    }
    this.pushSlotToChildren(config)
    return config
  }
}
