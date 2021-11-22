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

  getHtml(config: WidgetConfig) {
    const template = this.getWidgetHtml('slot', config?.children?.[0] as WidgetConfig)
    return {
      tag: 'div',
      type: 'root',
      props: {
        class: 'v-root',
        style: this.getWidgetStyle(config.style)
      },
      default: template
    }
  }

  getTemplate(config: WidgetConfig) {
    const template = this.getWidgetTemplate('slot', config?.children?.[0] as WidgetConfig)
    return h('div', { class: 'v-root', style: this.getWidgetStyle(config.style) }, [template])
  }

  getPreview(config: WidgetConfig) {
    const template = this.getWidgetPreview('slot', config?.children?.[0] as WidgetConfig)
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
        backgroundColor: '#fff'
      },
      props: {
        schema: '1',
        dataUrl: ''
      },
      propConfigs: [
        {
          label: '页面类型',
          type: 'select',
          model: 'schema',
          items: PAGE_SCHEMA_TYPES
        },
        {
          label: '数据接口',
          type: 'input',
          model: 'dataUrl'
        }
      ],
      parent: null,
      children: [],
      settled: false
    }
    this.pushSlotToChildren(config)
    return config
  }
}
