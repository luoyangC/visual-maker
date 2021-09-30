import WidgetDefault from './widget-default';

export default class WidgetTable extends WidgetDefault {
  constructor() {
    super();
    this.name = 'table';
    this.icon = 'table';
    this.label = '表格';

    this.isDrag = true;
    this.isEnum = false;
  }
  onStyleRepaint(config) {
    const restyle = { width: 0, height: 0 };

    const listPading = config.attrs.padding;
    const itemSize = config.props.column;
    const contentWidth = config.style.width - 2 * listPading;
    const contentHeight = config.style.height - 2 * listPading;

    restyle.width = contentWidth / itemSize;
    restyle.height = contentHeight;

    config.children.forEach((item) => {
      item.style.width = restyle.width;
      item.style.height = restyle.height;
      if (item.restrict && item.children.length) {
        item.children[0].style.width = restyle.width;
        item.children[0].style.height = restyle.height;
      }
    });
  }

  getTableAttrs(attrs) {
    return {
      padding: attrs.padding + 'px',
    };
  }

  getColumnTemplate(h, config) {
    const items = config.children.map((item) => {
      return this.getWidget('slot').getTemplate(h, item);
    });
    return items;
  }
  getTemplate(h, config) {
    const columns = this.getColumnTemplate(h, config);
    return (
      <div
        class='v-table'
        style={{ ...this.getWidgetStyle(config.style, config), ...this.getTableAttrs(config.attrs) }}
        v-on:mousedown={this.preventDefault}
      >
        {columns}
      </div>
    );
  }

  getObject() {
    const obj = {
      type: 'table',
      style: {
        ...this.commonStyle,
        width: 500,
        height: 250,
      },
      attrs: {
        padding: 10,
      },
      attrConfigs: [
        {
          label: '表格边距',
          type: 'number',
          model: 'padding',
        },
      ],
      props: {
        column: 3,
        row: 3,
      },
      propConfigs: [
        {
          label: '列数',
          model: 'column',
          type: 'number',
          func: (val, old, objct) => {
            if (val > old) {
              this.pushSlotToChildren(objct);
            } else if (val < old) {
              this.popSlotFromChildren(objct);
            }
          },
        },
        {
          label: '行数',
          model: 'row',
          type: 'number',
          func: () => {},
        },
      ],
      children: [],
    };
    for (let index = 0; index < obj.props.column; index++) {
      this.pushSlotToChildren(obj, { restrict: true, slotType: 'column', row: obj.props.row });
    }
    this.onStyleRepaint(obj);
    return obj;
  }
}
