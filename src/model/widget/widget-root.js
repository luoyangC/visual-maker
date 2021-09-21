import WidgetDefault from './widget-default';

export default class WidgetRoot extends WidgetDefault {
  constructor() {
    super();
    this.name = 'root';
    this.isDrag = false;
    this.isEnum = false;
  }

  getTemplate(h, config) {
    return (
      <div style={this.getWidgetStyle(config.style)}>
        <vm-slot parentWidgetObj={config}></vm-slot>
      </div>
    );
  }

  getObject() {
    const schemaItems = [
      {
        value: 1,
        label: '静态',
      },
      {
        value: 2,
        label: '动态',
      },
    ];

    return {
      type: 'root',
      props: {
        schema: 1,
        url: '',
      },
      attr: {},
      style: {
        ...this.commonStyle,
        width: 1000,
        height: 800,
        textAlign: undefined,
      },
      propConfigs: [
        {
          label: '页面类型',
          type: 'select',
          model: 'schema',
          items: schemaItems,
        },
        {
          label: '数据接口',
          type: 'input',
          model: 'url',
        },
      ],
      children: [],
    };
  }
}
