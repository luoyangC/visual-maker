import WidgetDefault from './widget-default';
import { isBoolean } from '@/utils/type';

export default class WidgetSlot extends WidgetDefault {
  constructor() {
    super();
    this.name = 'slot';
    this.isDrag = false;
    this.isEnum = false;
  }
  getTemplate(h, config) {
    return <vm-slot class='v-slot' parentWidgetObj={config} v-on:mousedown={this.preventDefault}></vm-slot>;
  }

  getObject(params = {}) {
    const obj = {
      type: 'slot',
      style: {
        ...params.style,
      },
      props: {
        ...params.props,
      },
      parent: params.parent,
      restrict: isBoolean(params.restrict) ? params.restrict : false,
      children: [],
    };
    if (params.slotType) {
      const slotObj = this.getWidgetObj(params.slotType, { ...params, parent: obj });
      obj.children.push(slotObj);
    }
    return obj;
  }
}
