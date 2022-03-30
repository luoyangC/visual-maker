import { h } from 'vue'
import { Widget, WidgetConfig, LooseOptions } from './index'

export class TableWidget extends Widget {
  constructor() {
    super()
    this.name = 'table'
    this.icon = 'table'
    this.label = '表格'

    this.isDrag = true
    this.isEnum = false
  }

  onStyleRepaint(config: WidgetConfig) {
    const restyle = { width: 0, height: 0 }

    const listPadding = config.attrs?.padding
    const itemSize = config.attrs?.column
    const contentWidth = config.style.width - 2 * listPadding
    const contentHeight = config.style.height - 2 * listPadding

    restyle.width = contentWidth / itemSize
    restyle.height = contentHeight

    config.children?.forEach((item) => {
      item.style.width = restyle.width
      item.style.height = restyle.height
      if (item.settled && item.children?.length) {
        item.children[0].style.width = restyle.width
        item.children[0].style.height = restyle.height
      }
    })
  }

  getTableAttrs(attrs?: LooseOptions) {
    return {
      padding: attrs?.padding + 'px'
    }
  }

  getItemStyle(config: WidgetConfig) {
    const style = {
      width: config.style.width + 'px',
      height: config.style.height + 'px',
      padding: config.parent?.attrs?.padding + 'px'
    }
    return style
  }

  getTemplate(config: WidgetConfig) {
    const columns = config.children?.map((item) => this.getWidgetTemplate('slot', item))
    return h(
      'div',
      {
        class: 'v-table',
        style: {
          ...this.getWidgetStyle(config.style, config),
          ...this.getTableAttrs(config.attrs)
        },
        onMousedown: this.preventDefault
      },
      [columns]
    )
  }

  getPreview(config: WidgetConfig) {
    const columns = config.children?.map((item) => this.getWidgetPreview('slot', item))
    return h(
      'div',
      {
        class: 'v-table',
        style: { ...this.getWidgetStyle(config.style, config), ...this.getTableAttrs(config.attrs) }
      },
      [columns]
    )
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'table',
      lock: false,
      style: {
        width: 500,
        height: 250,
        minWidth: 100,
        minHeight: 100,
        opacity: 1,
        rotate: 0,
        overflow: 'hidden',
        fontSize: 20,
        fontFamily: 'sans-serif',
        color: '',
        backgroundColor: '#fff'
      },
      attrs: {
        padding: 10,
        column: 3,
        row: 3,
        headHeight: 48,
        rowHeight: 60
      },
      attrConfigs: [
        {
          label: '表格边距',
          type: 'number',
          model: 'padding'
        },
        {
          label: '表头高度',
          type: 'number',
          model: 'headHeight'
        },
        {
          label: '行高',
          type: 'number',
          model: 'rowHeight'
        },
        {
          label: '列数',
          model: 'column',
          type: 'number',
          func: (val: number, old: number, widget: WidgetConfig) => {
            if (val > old) {
              this.pushSlotToChildren(widget, {
                settled: true,
                slotType: 'column',
                attrs: { row: config.attrs?.row, headHeight: config.attrs?.headHeight }
              })
            } else if (val < old) {
              this.popSlotFromChildren(widget)
            }
          }
        },
        {
          label: '行数',
          model: 'row',
          type: 'number',
          func: (val: number, old: number, widget: WidgetConfig) => {
            widget.children?.forEach((slotItem) => {
              const columnItem = slotItem.children?.[0]
              if (columnItem) {
                if (val > old) {
                  this.pushSlotToChildren(columnItem, { settled: true })
                  columnItem.attrs && columnItem.attrs.row++
                } else if (val < old) {
                  this.popSlotFromChildren(columnItem)
                  columnItem.attrs && columnItem.attrs.row--
                }
              }
            })
          }
        }
      ],
      props: {},
      propConfigs: [],
      children: [],
      settled: false
    }
    for (let index = 0; index < config.attrs?.column; index++) {
      this.pushSlotToChildren(config, {
        settled: true,
        slotType: 'column',
        attrs: { row: config.attrs?.row, headHeight: config.attrs?.headHeight }
      })
    }
    this.onStyleRepaint(config)
    return config
  }
}
