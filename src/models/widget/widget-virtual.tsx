import { h } from 'vue'
import { Widget, WidgetConfig } from './index'

export class VirtualWidget extends Widget {
  constructor() {
    super()
    this.name = 'virtual'

    this.isDrag = false
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    return h('div', {
      class: 'v-virtual',
      style: this.getWidgetStyle(config.style),
      onMousedown: this.preventDefault
    })
  }

  getPreview(config: WidgetConfig) {
    return h('div', { class: '' })
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'virtual',
      lock: false,
      virtual: true,
      style: {
        width: 0,
        height: 0,
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
        backgroundColor: ''
      },
      children: []
    }
    return config
  }
}
