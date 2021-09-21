import WidgetDefault from './widget-default';

export default class WidgetButton extends WidgetDefault {
  constructor() {
    super();
    this.name = 'button';
    this.icon = 'button';
    this.label = '按钮';

    this.isDrag = true;
    this.isEnum = false;
  }
  getTemplate(h, config) {
    return (
      <button
        class='v-button'
        style={this.getWidgetStyle(config.style)}
        v-on:mousedown={this.preventDefault}
      >
        <span>{config.props.label}</span>
      </button>
    );
  }

  getObject() {
    return {
      type: 'button',
      style: {
        ...this.commonStyle,
        height: 42,
        width: 200,
        fontSize: 18,
        lineHeight: 1,
      },
      props: {
        label: '按钮文本',
      },
      propConfigs: [
        {
          label: '按钮文本',
          type: 'input',
          model: 'label',
        },
      ],
    };
  }
}
