import { LIST_DIRECTION_TYPES, LIST_STYLE_TYPES } from '@/constant/dict'
import { isArray, toPxNum } from '@/utils'
import { h } from 'vue'
import { LooseOptions, Widget, WidgetConfig } from './index'

export class ListWidget extends Widget {
  constructor() {
    super()
    this.name = 'list'
    this.icon = 'list'
    this.label = '列表'

    this.isDrag = true
    this.isEnum = false
  }

  onStyleRepaint(config: WidgetConfig) {
    const restyle = { width: 0, height: 0 }

    const itemHeight = toPxNum(config.attrs?.itemHeight)

    const listWidth = config.style.width
    const listHeight = config.style.height

    if (config.attrs?.flexDirection === 'column') {
      const itemGap = toPxNum(config.attrs?.itemGap, listHeight)
      restyle.width = listWidth - 2 * itemGap
      restyle.height = itemHeight
    } else {
      const itemGap = toPxNum(config.attrs?.itemGap, listWidth)
      restyle.width = itemHeight
      restyle.height = listHeight - 2 * itemGap
    }

    config.children?.forEach((item) => {
      item.style.width = restyle.width
      item.style.height = restyle.height
      if (item.settled && item.children?.length) {
        item.children[0].style.width = restyle.width
        item.children[0].style.height = restyle.height
      }
    })
  }

  getCustomStyle(style?: LooseOptions, config?: WidgetConfig) {
    return {
      ...style,
      flexDirection: config?.attrs?.flexDirection,
      listStyle: config?.attrs?.listStyle
    }
  }

  getItemStyle(config: WidgetConfig, isLast: boolean) {
    const style: any = {
      width: config.style.width + 'px',
      height: config.style.height + 'px'
    }
    const listConfig = config.parent

    if (listConfig?.attrs?.flexDirection === 'column') {
      style['marginTop'] = toPxNum(listConfig?.attrs?.itemGap, listConfig.style.height) + 'px'
      if (isLast) {
        style['marginBottom'] = toPxNum(listConfig?.attrs?.itemGap, listConfig.style.height) + 'px'
      }
    } else if (listConfig?.attrs?.flexDirection === 'row') {
      style['marginLeft'] = toPxNum(listConfig?.attrs?.itemGap, listConfig.style.width) + 'px'
      if (isLast) {
        style['marginRight'] = toPxNum(listConfig?.attrs?.itemGap, listConfig.style.width) + 'px'
      }
    }
    return style
  }

  getItemTemplate(config: WidgetConfig, isLast: boolean) {
    const template = this.getWidgetTemplate('slot', config)
    return h('li', { class: 'v-li', style: this.getItemStyle(config, isLast) }, [template])
  }

  getTemplate(config: WidgetConfig) {
    const items = config.children?.map((item, index) => {
      const isLast = index === (config.children?.length as number) - 1
      return this.getItemTemplate(item, isLast)
    })
    return h(
      'ul',
      {
        class: 'v-ul',
        style: this.getWidgetStyle(config.style, config),
        onMousedown: this.preventDefault
      },
      [items]
    )
  }

  getListModel(config: WidgetConfig, data: any): Array<any> | undefined {
    const listModel = data[config.props?.listModel]
    if (isArray(listModel)) {
      return listModel
    }
    return undefined
  }

  getItemPreview(config: WidgetConfig, isLast: boolean, data: any) {
    const template = this.getWidgetPreview('slot', config, data)
    return h('li', { class: 'v-li', style: this.getItemStyle(config, isLast) }, [template])
  }

  getPreview(config: WidgetConfig, data: any) {
    const items = this.getListModel(config, data)
      ? this.getListModel(config, data)?.map((item, index) => {
          const _data = { ['row']: item, _scope: data }
          const isLast = index === (config.children?.length as number) - 1
          return this.getItemPreview((config.children as Array<WidgetConfig>)[0], isLast, _data)
        })
      : config.children?.map((item, index) => {
          const isLast = index === (config.children?.length as number) - 1
          return this.getItemPreview(item, isLast, data)
        })
    return h(
      'ul',
      {
        class: 'v-ul',
        style: this.getWidgetStyle(config.style, config)
      },
      [items]
    )
  }

  getConfig() {
    const config: WidgetConfig = {
      type: 'list',
      lock: false,
      style: {
        width: 400,
        height: 400,
        minWidth: 100,
        minHeight: 100,
        opacity: 1,
        rotate: 0,
        overflow: 'auto',
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
        flexDirection: 'column',
        listStyle: 'none',
        itemGap: 10,
        itemHeight: 62,
        itemNum: 7
      },
      attrConfigs: [
        {
          label: '列表方向',
          type: 'select',
          model: 'flexDirection',
          items: LIST_DIRECTION_TYPES
        },
        {
          label: '列表样式',
          type: 'select',
          model: 'listStyle',
          items: LIST_STYLE_TYPES
        },
        {
          label: '元素高度',
          type: 'unit',
          model: 'itemHeight',
          func: (val: number, old: number, widget: WidgetConfig) => {
            this.onStyleRepaint(widget)
          }
        },
        {
          label: '元素间距',
          type: 'unit',
          model: 'itemGap',
          func: (val: number, old: number, widget: WidgetConfig) => {
            this.onStyleRepaint(widget)
          }
        },
        {
          label: '元素个数',
          model: 'itemNum',
          type: 'number',
          func: (val: number, old: number, widget: WidgetConfig) => {
            if (val > old) {
              this.pushSlotToChildren(widget, { settled: true })
            } else if (val < old) {
              this.popSlotFromChildren(widget)
            }
          }
        }
      ],
      props: {
        dataset: {},
        dataApi: '',
        dataModel: '',
        listModel: '',
        itemModel: ''
      },
      propConfigs: [
        {
          label: '列表模型',
          type: 'input',
          model: 'listModel'
        },
        {
          label: '元素模型',
          type: 'input',
          model: 'itemModel'
        }
      ],
      children: [],
      settled: false
    }
    for (let index = 0; index < config.attrs?.itemNum; index++) {
      this.pushSlotToChildren(config, { settled: true })
    }
    return config
  }
}
