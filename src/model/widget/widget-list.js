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
  getTemplate(h, config) {
    return (
      <ul
        class='v-ul'
        style={this.getWidgetStyle(config.style)}
        v-on:mousedown={this.preventDefault}
      >
        <li>{this.getWidget('slot').getTemplate(h, config.children[0])}</li>
      </ul>
    );
  }

  getObject() {
    return {
      type: 'list',
      style: {
        ...this.commonStyle,
        width: 200,
        height: 200,
      },
      props: {
        size: 1,
      },
      propConfigs: [
        {
          label: '列数',
          type: 'input',
          model: 'size',
        },
      ],
      children: [this.getWidgetObj('slot')],
    };
  }
}
