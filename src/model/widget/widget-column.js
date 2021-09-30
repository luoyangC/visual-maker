import WidgetDefault from './widget-default';

export default class WidgetColumn extends WidgetDefault {
  constructor() {
    super();
    this.name = 'column';

    this.isDrag = false;
    this.isEnum = false;
  }

  onStyleRepaint(config) {
    const restyle = { width: 0, height: 0 };

    const itemPading = config.attrs.padding;
    const itemSize = config.props.row;

    const contentWidth = config.style.width;
    const contentHeight = config.style.height - config.attrs.headHeight;

    restyle.width = contentWidth;
    restyle.height = contentHeight / itemSize;

    config.children.forEach((item) => {
      item.style.width = restyle.width;
      item.style.height = restyle.height;
      if (item.restrict && item.children.length) {
        item.children[0].style.width = restyle.width - 2 * itemPading;
        item.children[0].style.height = restyle.height - 2 * itemPading;
      }
    });
  }

  getHeadStyle(config) {
    const reslut = {
      width: config.style.width + 'px',
      height: config.attrs.headHeight + 'px',
      padding: config.attrs.padding + 'px',
    };
    return reslut;
  }

  getItemStyle(config) {
    const reslut = {
      width: config.style.width + 'px',
      height: config.style.height + 'px',
      padding: config.parent.attrs.padding + 'px',
    };
    return reslut;
  }

  getHeadTemplate(h, config) {
    return (
      <dt class='v-table-head' style={this.getHeadStyle(config)}>
        {config.props.head}
      </dt>
    );
  }

  getItemTemplate(h, config) {
    return (
      <dd class='v-table-cell' style={this.getItemStyle(config)}>
        {this.getWidget('slot').getTemplate(h, config)}
      </dd>
    );
  }

  getTemplate(h, config) {
    const head = this.getHeadTemplate(h, config);
    const items = config.children.map((item) => {
      return this.getItemTemplate(h, item);
    });
    return (
      <dl
        class='v-table-column'
        style={{ ...this.getWidgetStyle(config.style, config) }}
        v-on:mousedown={this.preventDefault}
      >
        {head}
        {items}
      </dl>
    );
  }

  getObject(params = {}) {
    const obj = {
      type: 'column',
      style: {
        ...this.commonStyle,
      },
      attrs: {
        headHeight: 48,
        padding: 10,
      },
      attrConfigs: [
        {
          label: '表头高度',
          type: 'number',
          model: 'headHeight',
        },
        {
          label: '内容边距',
          type: 'number',
          model: 'padding',
        },
      ],
      props: {
        head: '表头',
        row: params.row,
      },
      propConfigs: [
        {
          label: '组件内容',
          type: 'input',
          model: 'head',
        },
      ],
      parent: params.parent,
      children: [],
      deletable: false,
    };
    for (let index = 0; index < params.row; index++) {
      this.pushSlotToChildren(obj, { restrict: true });
    }
    this.onStyleRepaint(obj);
    return obj;
  }
}
