import WidgetDefault from './widget-default';

export default class WidgetColumn extends WidgetDefault {
  constructor() {
    super();
    this.name = 'column';

    this.isDrag = false;
    this.isEnum = false;
  }

  getHeadTemplate(h, config) {
    return <span>{config.props.head}</span>;
  }

  getItemTemplate(h, config, index) {
    return this.getWidget('slot').getTemplate(h, config);
  }

  getObject(params = {}) {
    const obj = {
      type: 'column',
      style: {
        ...this.commonStyle,
      },
      props: {
        head: '表头',
      },
      propConfigs: [
        {
          label: '组件内容',
          type: 'input',
          model: 'head',
        },
      ],
      children: [],
    };
    for (let index = 0; index < params.row; index++) {
      this.pushSlotToChildren(obj, { restrict: true });
    }
    return obj;
  }
}
