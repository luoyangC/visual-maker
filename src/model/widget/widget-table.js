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
  getTemplate() {}

  getObject() {
    return {
      type: 'table',
      style: {
        ...this.commonStyle,
      },
    };
  }
}
