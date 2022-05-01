import { h, resolveComponent } from 'vue'
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
      resolveComponent('ElButton'),
      {
        class: 'v-button',
        style: this.getWidgetStyle(config.style),
        onMousedown: this.preventDefault
      },
      config.props?.label
    )
  }

  getPreview(config: WidgetConfig, data: any) {
    return h(
      resolveComponent('ElButton'),
      {
        class: 'v-button',
        style: this.getWidgetStyle(config.style)
      },
      this.getPreviewModel(config.props?.label, data)
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
        justifyContent: '',
        alignItems: '',
        lineHeight: 1,
        letterSpacing: 0,
        color: '',
        backgroundColor: '#fff',
        backgroundImage: '',
        backgroundPosition: '',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat'
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
