import WidgetDefault from './widget-default';

export default class WidgetList extends WidgetDefault {
  constructor() {
    super();
    this.name = 'list';
    this.icon = 'list';
    this.label = '列表';

    this.isDrag = true;
    this.isEnum = false;
  }
  getTemplate(h, config) {}

  getObject() {
    return {
      type: 'list',
      style: {
        ...this.commonStyle,
        width: 200,
        height: 200,
      },
      children: [],
    };
  }
}
