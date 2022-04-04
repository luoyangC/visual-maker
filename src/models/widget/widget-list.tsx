import { LIST_DIRECTION_TYPES, LIST_STYLE_TYPES } from '@/constant/dict'
import { toPxNum } from '@/utils'
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

    const itemNum = config.attrs?.itemNum
    const contentWidth = config.style.width
    const contentHeight = config.style.height

    if (config.attrs?.flexDirection === 'column') {
      const itemGap = toPxNum(config.attrs?.itemGap, contentHeight)
      restyle.width = contentWidth
      restyle.height = (contentHeight - (itemNum + 1) * itemGap) / itemNum
    } else {
      const itemGap = toPxNum(config.attrs?.itemGap, contentWidth)
      restyle.width = (contentWidth - (itemNum + 1) * itemGap) / itemNum
      restyle.height = contentHeight
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

  getItemStyle(config: WidgetConfig) {
    const style = {
      width: config.style.width + 'px',
      height: config.style.height + 'px'
    }
    return style
  }

  getItemTemplate(config: WidgetConfig, index: number) {
    const template = this.getWidgetTemplate('slot', config)
    return h('li', { class: 'v-li', style: this.getItemStyle(config) }, [template])
  }

  getTemplate(config: WidgetConfig) {
    const items = config.children?.map((item, index) => {
      return this.getItemTemplate(item, index)
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

  getItemPreview(config: WidgetConfig, index: number) {
    const template = this.getWidgetPreview('slot', config)
    return h('li', { class: 'v-li', style: this.getItemStyle(config) }, [template])
  }

  getPreview(config: WidgetConfig) {
    const items = config.children?.map((item, index) => {
      return this.getItemPreview(item, index)
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
        flexDirection: 'column',
        listStyle: 'none',
        itemGap: 10,
        itemNum: 4
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
      props: {},
      propConfigs: [],
      children: [],
      settled: false
    }
    for (let index = 0; index < config.attrs?.itemNum; index++) {
      this.pushSlotToChildren(config, { settled: true })
    }
    this.onStyleRepaint(config)
    return config
  }
}
