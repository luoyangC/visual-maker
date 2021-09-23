import WidgetDefault from './widget-default';

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

  getObject(params = { free: true }) {
    return {
      type: 'slot',
      style: {},
      props: {
        free: params.free,
      },
      children: [],
    };
  }
}
