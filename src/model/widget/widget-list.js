import WidgetDefault from './widget-default';
import { LIST_DIRECTION_TYPES, LIST_STYLE_TYPES } from '@/constant/dict';

export default class WidgetList extends WidgetDefault {
  constructor() {
    super();
    this.name = 'list';
    this.icon = 'list';
    this.label = '列表';

    this.isDrag = true;
    this.isEnum = false;
  }

  onStyleRepaint(config) {
    const restyle = { width: 0, height: 0 };

    const listPading = config.attrs.padding;
    const itemGap = config.attrs.itemGap;
    const itemSize = config.props.size;
    const contentWidth = config.style.width - 2 * listPading;
    const contentHeight = config.style.height - 2 * listPading;

    if (config.attrs.flexDirection === 'column') {
      restyle.width = contentWidth;
      restyle.height = (contentHeight - (itemSize - 1) * itemGap) / itemSize;
    } else {
      restyle.width = (contentWidth - (itemSize - 1) * itemGap) / itemSize;
      restyle.height = contentHeight;
    }

    config.children.forEach((item) => {
      item.style.width = restyle.width;
      item.style.height = restyle.height;
      if (item.restrict && item.children.length) {
        item.children[0].style.width = restyle.width;
        item.children[0].style.height = restyle.height;
      }
    });
  }

  getListAttrs(attrs) {
    return { ...attrs };
  }

  getItemStyle(config) {
    const reslut = {
      width: config.style.width + 'px',
      height: config.style.height + 'px',
    };
    return reslut;
  }

  getItemTemplate(h, config, index) {
    return (
      <li class='v-li' style={this.getItemStyle(config)}>
        {this.getWidget('slot').getTemplate(h, config)}
      </li>
    );
  }

  getTemplate(h, config) {
    const listElment = config.children.map((item, index) => {
      return this.getItemTemplate(h, item, index);
    });
    return (
      <ul
        class='v-ul'
        style={{ ...this.getWidgetStyle(config.style, config), ...this.getListAttrs(config.attrs) }}
        v-on:mousedown={this.preventDefault}
      >
        {listElment}
      </ul>
    );
  }

  getObject() {
    const obj = {
      type: 'list',
      style: {
        ...this.commonStyle,
        width: 400,
        height: 400,
      },
      attrs: {
        flexDirection: 'column',
        listStyle: 'none',
        itemGap: 10,
        padding: 10,
      },
      attrConfigs: [
        {
          label: '列表方向',
          type: 'select',
          model: 'flexDirection',
          items: LIST_DIRECTION_TYPES,
        },
        {
          label: '列表样式',
          type: 'select',
          model: 'listStyle',
          items: LIST_STYLE_TYPES,
        },
        {
          label: '列表边距',
          type: 'number',
          model: 'padding',
        },
        {
          label: '元素间距',
          type: 'number',
          model: 'itemGap',
        },
      ],
      props: {
        size: 3,
      },
      propConfigs: [
        {
          label: '列数',
          model: 'size',
          type: 'number',
          func: (val, old, objct) => {
            if (val > old) {
              this.pushSlotToChildren(objct, { restrict: true });
            } else if (val < old) {
              this.popSlotFromChildren(objct);
            }
          },
        },
      ],
      children: [],
    };
    for (let index = 0; index < obj.props.size; index++) {
      this.pushSlotToChildren(obj, { restrict: true });
    }
    this.onStyleRepaint(obj);
    return obj;
  }
}
