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
    };
  }

  getTemplate() {}

  getObject() {}

  getWidgetStyle(style, index) {
    const result = { ...style };
    if (result.width) {
      result.width += 'px';
    }

    if (result.height) {
      result.height += 'px';
    }

    if (result.top) {
      result.top += 'px';
    }

    if (result.left) {
      result.left += 'px';
    }

    if (result.fontSize) {
      result.fontSize += 'px';
    }

    if (result.rotate) {
      result.transform = 'rotate(' + result.rotate + 'deg)';
    }

    result.zIndex = index;
    result.top = 0;
    result.left = 0;

    return result;
  }

  preventDefault(e) {
    e.preventDefault();
  }

  stopPropagation(e) {
    e.stopPropagation();
  }
}
