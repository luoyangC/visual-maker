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
  getHeadTemplate(h, config) {
    return <th>{this.getWidget('column').getHeadTemplate(h, config.children[0])}</th>;
  }
  getItemTemplate(h, config, index) {
    return <td>{this.getWidget('column').getItemTemplate(h, config, index)}</td>;
  }
  getRowTemplate(h, config, index) {
    const items = config.children.map((item) => {
      const column = item.children[0];
      const slotConfig = column.children[index];
      return this.getItemTemplate(h, slotConfig, index);
    });
    return <tr>{items}</tr>;
  }
  getTemplate(h, config) {
    const columnHeads = config.children.map((item) => {
      return this.getHeadTemplate(h, item);
    });
    const rows = [];
    for (let index = 0; index < config.props.row; index++) {
      rows.push(this.getRowTemplate(h, config, index));
    }
    return (
      <table border='1' style={{ ...this.getWidgetStyle(config.style, config) }}>
        <thead>
          <tr>{columnHeads}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  pushColumnToChildren(obj, params) {
    const column = this.getWidgetObj('column', params);
    obj.children.push({ ...column, parent: obj });
  }

  popColumnFromChildren(obj) {
    obj.children.pop();
  }

  getObject() {
    const obj = {
      type: 'table',
      style: {
        ...this.commonStyle,
        width: 400,
        height: 300,
      },
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
    return obj;
  }
}
