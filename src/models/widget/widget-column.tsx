import { toPxNum } from '@/utils'
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

    const tableConfig = this.getTableConfig(config)
    const itemNum = tableConfig?.attrs?.rowNum
    const headHeight = toPxNum(tableConfig?.attrs?.headHeight)
    const itemPadding = toPxNum(tableConfig?.attrs?.rowPadding)

    const columnWidth = config.style.width
    const columnHeight = config.style.height

    restyle.width = columnWidth
    restyle.height = (columnHeight - headHeight) / itemNum

    config.children?.forEach((item) => {
      item.style.width = restyle.width - 2 * itemPadding
      item.style.height = restyle.height - 2 * itemPadding
      if (item.settled && item.children?.length) {
        item.children[0].style.width = restyle.width - 2 * itemPadding
        item.children[0].style.height = restyle.height - 2 * itemPadding
      }
    })
  }

  getTableConfig(config: WidgetConfig): WidgetConfig {
    if (config.type === 'table') {
      return config
    }
    return this.getTableConfig(config.parent as WidgetConfig)
  }

  getHeadStyle(config: WidgetConfig) {
    const tableConfig = this.getTableConfig(config)

    const style = {
      width: config.style.width + 'px',
      height: toPxNum(tableConfig?.attrs?.headHeight) + 'px',
      padding: toPxNum(tableConfig?.attrs?.rowPadding) + 'px'
    }
    return style
  }

  getItemStyle(config: WidgetConfig) {
    const tableConfig = this.getTableConfig(config)
    const itemPadding = toPxNum(tableConfig?.attrs?.rowPadding)

    const style = {
      width: config.style.width + 2 * itemPadding + 'px',
      height: config.style.height + 2 * itemPadding + 'px',
      padding: itemPadding + 'px'
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
        justifyContent: '',
        alignItems: '',
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '',
        backgroundColor: '#fff'
      },
      attrs: {
        width: '',
        headHeight: '',
        rowPadding: ''
      },
      attrConfigs: [
        {
          label: '当前列宽',
          type: 'unit',
          model: 'width'
        }
      ],
      props: {
        head: '表头'
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
    for (let index = 0; index < options.attrs?.rowNum; index++) {
      this.pushSlotToChildren(config, { settled: true })
    }
    return config
  }
}
