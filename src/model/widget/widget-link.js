import WidgetDefault from './widget-default';

export default class WidgetLink extends WidgetDefault {
  constructor() {
    super();
    this.name = 'link';
    this.icon = 'link';
    this.label = '链接';

    this.isDrag = true;
    this.isEnum = false;
  }
  getTemplate(h, config) {
    return (
      <a
        class='v-link'
        style={this.getWidgetStyle(config.style)}
        href={config.props.href}
        v-on:mousedown={this.preventDefault}
      >
        {config.props.value}
      </a>
    );
  }

  getObject() {
    return {
      type: 'link',
      style: {
        ...this.commonStyle,
      },
      props: {
        value: '链接标题',
        href: '#',
      },
      propConfigs: [
        {
          label: '链接标题',
          type: 'input',
          model: 'value',
        },
        {
          label: '链接地址',
          type: 'input',
          model: 'href',
        },
      ],
    };
  }
}
