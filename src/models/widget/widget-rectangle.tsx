import { h } from 'vue'
import { Widget, WidgetConfig } from '.'

export class RectangleWidget extends Widget {
  constructor() {
    super()
    this.name = 'rectangle'
    this.icon = 'rectangle'
    this.label = '矩形'

    this.isDrag = true
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    const template = this.getWidgetTemplate('slot', config?.children?.[0] as WidgetConfig)
    return h(
      'div',
      {
        class: 'v-rectangle',
        style: this.getWidgetStyle(config.style),
        onMousedown: this.preventDefault
      },
      [template]
    )
  }

  getPreview(config: WidgetConfig, data: any) {
    const template = this.getWidgetPreview('slot', config?.children?.[0] as WidgetConfig, data)
    return h('div', { class: 'v-rectangle', style: this.getWidgetStyle(config.style) }, [template])
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'rectangle',
      lock: false,
      style: {
        width: 200,
        height: 200,
        minWidth: 10,
        minHeight: 10,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        fontSize: 20,
        fontFamily: 'sans-serif',
        textStyles: [],
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 1.5,
        letterSpacing: 0,
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
      children: []
    }
    this.pushSlotToChildren(config)
    return config
  }
}
