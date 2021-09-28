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
  getTemplate(h, config) {
    return (
      <table style={{ ...this.getWidgetStyle(config.style, config) }}>
        <thead>
          <tr>
            <th>aaa</th>
            <th>bbb</th>
            <th>ccc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
          <tr>
            <td>456</td>
            <td>456</td>
            <td>456</td>
          </tr>
          <tr>
            <td>789</td>
            <td>789</td>
            <td>789</td>
          </tr>
        </tbody>
      </table>
    );
  }

  getObject() {
    return {
      type: 'table',
      style: {
        ...this.commonStyle,
        width: 400,
        height: 400,
      },
    };
  }
}
