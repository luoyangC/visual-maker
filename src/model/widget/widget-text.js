import WidgetDefault from './widget-default';

export default class WidgetText extends WidgetDefault {
  constructor() {
    super();
    this.name = 'text';
    this.icon = 'text';
    this.label = '文本';

    this.isDrag = true;
    this.isEnum = false;
  }
  getTemplate(h, config) {
    return (
      <div
        class='v-text'
        style={this.getWidgetStyle(config.style)}
        v-on:mousedown={this.preventDefault}
      >
        {config.props.value}
      </div>
    );
  }

  getObject() {
    return {
      type: 'text',
      style: {
        ...this.commonStyle,
        verticalAlign: 'middle',
      },
      props: {
        value: '文本占位',
      },
      propConfigs: [
        {
          label: '组件内容',
          type: 'input',
          model: 'value',
        },
      ],
    };
  }
}
