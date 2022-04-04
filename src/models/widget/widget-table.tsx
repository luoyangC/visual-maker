import { toPxNum } from '@/utils'
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
    const tableWidth = config.style.width
    const tableHeight = config.style.height

    config.children?.forEach((item) => {
      if (item.settled && item.children?.length) {
        const attrWidth = toPxNum(item.children[0].attrs?.width, tableWidth)
        if (attrWidth > 0) {
          item.style.width = attrWidth
          item.children[0].style.width = attrWidth
        } else {
          const realWidth = this.getAutoColumnWidth(config)
          item.style.width = realWidth
          item.children[0].style.width = realWidth
        }

        item.style.height = tableHeight
        item.children[0].style.height = tableHeight
      }
    })

    this.setHeadHeight(config)
  }

  setHeadHeight(config: WidgetConfig) {
    const headHeight = toPxNum(config.attrs?.headHeight)
    if (config.attrs) {
      config.attrs['rowHeight'] = toPxNum((config.style.height - headHeight) / config.attrs?.rowNum)
    }
  }

  getAutoColumnWidth(config: WidgetConfig) {
    let columnNum = 0
    let remWidth = config.style.width
    config.children?.forEach((item) => {
      if (item.settled && item.children?.length) {
        const attrWidth = toPxNum(item.children[0].attrs?.width, config.style.width)
        if (attrWidth > 0) {
          remWidth = remWidth - attrWidth
        } else {
          columnNum++
        }
      }
    })
    return remWidth / columnNum
  }

  getTemplate(config: WidgetConfig) {
    const columns = config.children?.map((item) => this.getWidgetTemplate('slot', item))
    return h(
      'div',
      {
        class: 'v-table',
        style: this.getWidgetStyle(config.style, config),
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
        style: this.getWidgetStyle(config.style, config)
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
        columnNum: 3,
        rowNum: 3,
        headHeight: 64,
        rowHeight: 62,
        rowPadding: 10
      },
      attrConfigs: [
        {
          label: '表头高度',
          type: 'unit',
          model: 'headHeight',
          func: (val: string, old: string, config: WidgetConfig) => {
            const diff = toPxNum(val) - toPxNum(old)
            if (config.style) {
              config.style['height'] = config.style['height'] + diff
            }
          }
        },
        {
          label: '内容高度',
          type: 'unit',
          model: 'rowHeight',
          func: (val: string, old: string, config: WidgetConfig) => {
            const diff = (toPxNum(val) - toPxNum(old)) * config.attrs?.rowNum
            if (config.style) {
              config.style['height'] = config.style['height'] + diff
            }
          }
        },
        {
          label: '内容边距',
          type: 'unit',
          model: 'rowPadding'
        },
        {
          label: '列数',
          model: 'columnNum',
          type: 'number',
          func: (val: number, old: number, config: WidgetConfig) => {
            if (val > old) {
              this.pushSlotToChildren(config, {
                settled: true,
                slotType: 'column',
                attrs: { rowNum: config.attrs?.rowNum }
              })
            } else if (val < old) {
              this.popSlotFromChildren(config)
            }
          }
        },
        {
          label: '行数',
          model: 'rowNum',
          type: 'number',
          func: (val: number, old: number, config: WidgetConfig) => {
            if (config.style) {
              const diff = toPxNum(config.attrs?.rowHeight) * (val - old)
              config.style['height'] = config.style['height'] + diff
            }
            config.children?.forEach((slotItem) => {
              const columnItem = slotItem.children?.[0]
              if (columnItem) {
                if (val > old) {
                  this.pushSlotToChildren(columnItem, { settled: true })
                  columnItem.attrs && columnItem.attrs.rowNum++
                } else if (val < old) {
                  this.popSlotFromChildren(columnItem)
                  columnItem.attrs && columnItem.attrs.rowNum--
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
    for (let index = 0; index < config.attrs?.columnNum; index++) {
      this.pushSlotToChildren(config, {
        settled: true,
        slotType: 'column',
        attrs: { rowNum: config.attrs?.rowNum }
      })
    }
    this.onStyleRepaint(config)
    return config
  }
}
