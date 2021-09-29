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
    return <vm-slot class='v-slot' parentWidgetObj={config}></vm-slot>;
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
      restrict: isBoolean(params.restrict) ? params.restrict : false,
      children: [],
    };
    if (params.slotType) {
      const slot = this.getWidgetObj(params.slotType, params);
      obj.children.push({ ...slot, parent: obj });
    }
    return obj;
  }
}
