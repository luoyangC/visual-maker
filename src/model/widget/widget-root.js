import WidgetDefault from './widget-default';
import { PAGE_SCHEMA_TYPES } from '@/constant/dict';
export default class WidgetRoot extends WidgetDefault {
  constructor() {
    super();
    this.name = 'root';
    this.isDrag = false;
    this.isEnum = false;
  }

  getTemplate(h, config) {
    return (
      <div class='v-root' style={this.getWidgetStyle(config.style)}>
        {this.getWidget('slot').getTemplate(h, config.children[0])}
      </div>
    );
  }

  getObject() {
    const obj = {
      type: 'root',
      props: {
        schema: 1,
        dataUrl: '',
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
          items: PAGE_SCHEMA_TYPES,
        },
        {
          label: '数据接口',
          type: 'input',
          model: 'dataUrl',
        },
      ],
      parent: null,
      children: [],
    };
    this.pushSlotToChildren(obj);
    return obj;
  }
}
