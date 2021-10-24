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
    const template = this.getWidget('slot').getTemplate(config?.children?.[0])
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
