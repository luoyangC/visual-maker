import widgets from '@/model/widget';

class WidgetHook {
  constructor() {
    this.widgets = {};
    this.dragTypeList = [];
    this.enumTypeList = [];
  }

  getWidget(name) {
    return this.widgets[name] || this.widgets['default'];
  }

  newWidget(Widget) {
    const el = new Widget();

    this.widgets[el.name] = el;
    if (el.isDrag) {
      this.dragTypeList.push({
        type: el.name,
        icon: el.icon,
        label: el.label,
      });
    }
    if (el.isEnum) {
      this.enumTypeList.push({
        type: el.name,
        icon: el.icon,
        label: el.label,
      });
    }
    return el;
  }

  getDragTypeList() {
    return this.dragTypeList;
  }

  getObject(name) {
    return this.getWidget(name).getObject();
  }
}

const instance = new WidgetHook();

Object.keys(widgets).forEach((key) => {
  instance.newWidget(widgets[key]);
});

export default instance;
