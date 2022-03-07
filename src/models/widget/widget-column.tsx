import { h } from 'vue'
import { WidgetConfigOptions, Widget, WidgetConfig } from './index'

export class ColumnWidget extends Widget {
  constructor() {
    super()
    this.name = 'column'

    this.isDrag = false
    this.isEnum = false
  }

  onStyleRepaint(config: WidgetConfig) {
    const restyle = { width: 0, height: 0 }

    const itemPadding = config.attrs?.padding
    const itemSize = config.props?.row

    const contentWidth = config.style.width
    const contentHeight = config.style.height - config.attrs?.headHeight

    restyle.width = contentWidth
    restyle.height = contentHeight / itemSize

    config.children?.forEach((item) => {
      item.style.width = restyle.width
      item.style.height = restyle.height
      if (item.settled && item.children?.length) {
        item.children[0].style.width = restyle.width - 2 * itemPadding
        item.children[0].style.height = restyle.height - 2 * itemPadding
      }
    })
  }

  getHeadStyle(config: WidgetConfig) {
    const style = {
      width: config.style.width + 'px',
      height: config.attrs?.headHeight + 'px',
      padding: config.attrs?.padding + 'px'
    }
    return style
  }

  getItemStyle(config: WidgetConfig) {
    const style = {
      width: config.style.width + 'px',
      height: config.style.height + 'px',
      padding: config.parent?.attrs?.padding + 'px'
    }
    return style
  }

  getHeadTemplate(config: WidgetConfig) {
    return h('dt', { class: 'v-table-head', style: this.getHeadStyle(config) }, config.props?.head)
  }

  getItemTemplate(config: WidgetConfig) {
    const template = this.getWidgetTemplate('slot', config)
    return h('dd', { class: 'v-table-cell', style: this.getItemStyle(config) }, [template])
  }

  getTemplate(config: WidgetConfig) {
    const head = this.getHeadTemplate(config)
    const items = config.children?.map((item) => {
      return this.getItemTemplate(item)
    })
    return h(
      'dl',
      {
        class: 'v-table-column',
        style: this.getWidgetStyle(config.style, config),
        onMousedown: this.preventDefault
      },
      [head, items]
    )
  }

  getItemPreview(config: WidgetConfig) {
    const template = this.getWidgetPreview('slot', config)
    return h('dd', { class: 'v-table-cell', style: this.getItemStyle(config) }, [template])
  }

  getPreview(config: WidgetConfig) {
    const head = this.getHeadTemplate(config)
    const items = config.children?.map((item) => {
      return this.getItemPreview(item)
    })
    return h(
      'dl',
      {
        class: 'v-table-column',
        style: this.getWidgetStyle(config.style, config)
      },
      [head, items]
    )
  }

  getConfig(options: WidgetConfigOptions) {
    const config: WidgetConfig = {
      type: 'column',
      lock: false,
      style: {
        width: 100,
        height: 100,
        minWidth: 50,
        minHeight: 50,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        fontSize: 20,
        fontFamily: 'sans-serif',
        textAlign: '',
        verticalAlign: '',
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '',
        backgroundColor: '#fff'
      },
      attrs: {
        headHeight: 48,
        padding: 10
      },
      attrConfigs: [
        {
          label: '表头高度',
          type: 'number',
          model: 'headHeight'
        },
        {
          label: '内容边距',
          type: 'number',
          model: 'padding'
        }
      ],
      props: {
        head: '表头',
        row: options.props?.row
      },
      propConfigs: [
        {
          label: '组件内容',
          type: 'input',
          model: 'head'
        }
      ],
      parent: options.parent,
      children: [],
      settled: true
    }
    for (let index = 0; index < options.props?.row; index++) {
      this.pushSlotToChildren(config, { settled: true })
    }
    this.onStyleRepaint(config)
    return config
  }
}
