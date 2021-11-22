import { h } from 'vue'
import { Widget, WidgetConfig } from './index'

export class LinkWidget extends Widget {
  constructor() {
    super()
    this.name = 'link'
    this.icon = 'link'
    this.label = '链接'

    this.isDrag = true
    this.isEnum = false
  }

  getHtml(config: WidgetConfig) {
    return {
      tag: 'a',
      type: 'link',
      props: {
        class: 'v-link',
        style: this.getWidgetStyle(config.style),
        href: config.props?.href
      },
      default: config.props?.value
    }
  }

  getTemplate(config: WidgetConfig) {
    return h(
      'a',
      {
        class: 'v-link',
        style: this.getWidgetStyle(config.style),
        href: config.props?.href,
        onMousedown: this.preventDefault
      },
      config.props?.value
    )
  }

  getPreview(config: WidgetConfig) {
    return h(
      'a',
      {
        class: 'v-link',
        style: this.getWidgetStyle(config.style),
        href: config.props?.href
      },
      config.props?.value
    )
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'link',
      lock: false,
      style: {
        width: 200,
        height: 30,
        minWidth: 100,
        minHeight: 30,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        fontSize: 20,
        fontFamily: 'sans-serif',
        textStyles: [],
        textAlign: '',
        verticalAlign: '',
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '',
        backgroundColor: '#fff'
      },
      props: {
        value: '链接标题',
        href: '#'
      },
      propConfigs: [
        {
          label: '链接标题',
          type: 'input',
          model: 'value'
        },
        {
          label: '链接地址',
          type: 'input',
          model: 'href'
        }
      ]
    }
    return config
  }
}
