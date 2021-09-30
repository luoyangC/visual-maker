import widgetHook from '@/hooks/widget';
export default class WidgetDefault {
  constructor() {
    this.name = 'default';
    this.isDrag = false;
    this.isEnum = false;

    this.commonStyle = {
      width: 200,
      height: 30,
      opacity: 1,
      rotate: 0,
      overflow: 'hidden',
      fontSize: 20,
      fontWeight: 500,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: '',
      verticalAlign: '',
      lineHeight: 1.5,
      letterSpacing: 0,
      color: '',
      backgroundColor: '#fff',
    };
  }

  getTemplate() {}

  getPreview() {}

  getObject() {}

  getWidget(name) {
    return widgetHook.getWidget(name);
  }

  getWidgetObj(name, params) {
    return widgetHook.getObject(name, params);
  }

  getWidgetStyle(style, config) {
    const result = { ...style };
    if (!isNaN(result.width)) {
      result.width += 'px';
    }

    if (!isNaN(result.height)) {
      result.height += 'px';
    }

    if (!isNaN(result.top)) {
      result.top += 'px';
    }

    if (!isNaN(result.left)) {
      result.left += 'px';
    }

    if (!isNaN(result.fontSize)) {
      result.fontSize += 'px';
    }

    if (!isNaN(result.rotate)) {
      result.transform = 'rotate(' + result.rotate + 'deg)';
    }

    result.top = 0;
    result.left = 0;

    this.onStyleRepaint(config);

    return result;
  }

  onStyleRepaint(config) {}

  pushSlotToChildren(obj, params) {
    const slotObj = this.getWidgetObj('slot', { ...params, parent: obj });
    obj.children.push({ ...slotObj, parent: obj });
  }

  popSlotFromChildren(obj) {
    obj.children.pop();
  }

  preventDefault(e) {
    e.preventDefault();
  }

  stopPropagation(e) {
    e.stopPropagation();
  }
}
