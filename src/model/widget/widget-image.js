import WidgetDefault from './widget-default';
import { IMAGE_OBJECT_FIT_TYPES } from '@/constant/dict';

export default class WidgetImage extends WidgetDefault {
  constructor() {
    super();
    this.name = 'image';
    this.icon = 'image';
    this.label = '图片';

    this.isDrag = true;
    this.isEnum = false;
  }
  getImageAttrs(attrs) {
    return {
      objectFit: attrs.fit,
    };
  }
  getTemplate(h, config) {
    return (
      <img
        class='v-image'
        style={{ ...this.getWidgetStyle(config.style), ...this.getImageAttrs(config.attrs) }}
        v-on:mousedown={this.preventDefault}
        src={config.props.src}
      ></img>
    );
  }

  getObject() {
    return {
      type: 'image',
      style: {
        ...this.commonStyle,
        width: 300,
        height: 200,
      },
      attrs: {
        fit: 'fill',
      },
      props: {
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      },
      attrConfigs: [
        {
          label: '裁切模式',
          type: 'select',
          model: 'fit',
          items: IMAGE_OBJECT_FIT_TYPES,
        },
      ],
      propConfigs: [
        {
          label: '图片链接',
          type: 'input',
          model: 'src',
        },
      ],
    };
  }
}
