import { h } from 'vue'
import { Widget, WidgetConfig } from './index'

export class ButtonWidget extends Widget {
  constructor() {
    super()
    this.name = 'button'
    this.icon = 'button'
    this.label = '按钮'

    this.isDrag = true
    this.isEnum = false
  }

  getTemplate(config: WidgetConfig) {
    return h(
      'button',
      {
        class: 'v-button',
        style: this.getWidgetStyle(config.style),
        onMousedown: this.preventDefault
      },
      config.props?.label
    )
  }

  getPreview(config: WidgetConfig) {
    return h(
      'button',
      {
        class: 'v-button v-preview',
        style: this.getWidgetStyle(config.style)
      },
      config.props?.label
    )
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'button',
      lock: false,
      style: {
        width: 200,
        height: 42,
        minWidth: 100,
        minHeight: 30,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        fontSize: 18,
        fontFamily: 'sans-serif',
        textStyles: [],
        textAlign: '',
        verticalAlign: '',
        lineHeight: 1,
        letterSpacing: 0,
        color: '',
        backgroundColor: '#fff'
      },
      props: {
        label: '按钮文本'
      },
      propConfigs: [
        {
          label: '按钮文本',
          type: 'input',
          model: 'label'
        }
      ]
    }
    return config
  }
}
