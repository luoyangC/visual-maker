<template>
  <div
    :class="{ 'vm-shape': true, active: active }"
    :style="getShapeStyle(widgetObj.style)"
    @click="selectCurWidgetObj"
    @mousedown="handleMouseDown"
    @contextmenu="handleContextMenu"
  >
    <div
      v-for="(item, index) in showPoint ? pointList : []"
      :key="index"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item)"
    />
    <vm-widget class="vm-widget" :widget="widgetObj" />
  </div>
</template>

<script>
import { eventBus, debounce } from '@/utils';
import { mapState } from 'vuex';

export default {
  name: 'VmShape',
  props: {
    widgetObj: {
      require: true,
      type: Object,
      default: () => {},
    },
    zIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pointList: ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'],
      directionKey: { t: 'n', b: 's', l: 'w', r: 'e' },
    };
  },
  computed: {
    ...mapState(['curWidgetObj']),
    active() {
      return this.widgetObj === this.curWidgetObj;
    },
    restrict() {
      return (
        this.widgetObj.parent &&
        this.widgetObj.parent.type === 'slot' &&
        this.widgetObj.parent.restrict
      );
    },
    isFilled() {
      return this.restrict && this.widgetObj.parent.children.length;
    },
    showPoint() {
      return this.active && !this.isFilled && this.widgetObj.type !== 'root';
    },
  },
  methods: {
    getShapeStyle(style) {
      const restyle = {};
      restyle.top = style.top + 'px';
      restyle.left = style.left + 'px';
      restyle.transform = 'rotate(' + style.rotate + 'deg)';
      return restyle;
    },

    getPointStyle(point) {
      const { width, height } = this.widgetObj.style;

      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);

      let newLeft = 0;
      let newTop = 0;

      if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
      } else {
        if (hasT || hasB) {
          newLeft = Math.floor(width / 2);
          newTop = hasT ? 0 : height;
        }
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width;
          newTop = Math.floor(height / 2);
        }
      }

      const style = {
        marginLeft: hasR ? '-3px' : '-4px',
        marginTop: hasB ? '-3px' : '-4px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor:
          point
            .split('')
            .reverse()
            .map((m) => this.directionKey[m])
            .join('') + '-resize',
      };

      return style;
    },

    handleMouseDown(e) {
      e.stopPropagation();

      this.$store.commit('setCurWidgetObj', {
        widgetObj: this.widgetObj,
        zIndex: this.zIndex,
      });

      if (this.restrict) {
        return;
      }

      const pos = { ...this.widgetObj.style };
      const startY = e.clientY;
      const startX = e.clientX;
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(pos.top);
      const startLeft = Number(pos.left);

      // 如果元素没有移动，则不保存快照
      let hasMove = false;
      const move = debounce((moveEvent) => {
        hasMove = true;
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        pos.top = currY - startY + startTop;
        pos.left = currX - startX + startLeft;

        // 修改当前组件样式
        this.$store.commit('setShapeStyle', pos);
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        this.$nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          // 后面两个参数代表鼠标移动方向
          // currY - startY > 0 true 表示向下移动 false 表示向上移动
          // currX - startX > 0 true 表示向右移动 false 表示向左移动
          eventBus.$emit('move', this.$el, currY - startY > 0, currX - startX > 0);
        });
      });

      const up = debounce(() => {
        hasMove && this.$store.commit('recordSnapshot');
        // 触发元素停止移动事件，用于隐藏标线
        eventBus.$emit('unmove');
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      });

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },

    selectCurWidgetObj(e) {
      // 阻止向父组件冒泡
      e.stopPropagation();
      e.preventDefault();
      this.$store.commit('hideContexeMenu');
    },

    handleMouseDownOnPoint(point) {
      const downEvent = window.event;
      downEvent.stopPropagation();
      downEvent.preventDefault();

      const pos = { ...this.widgetObj.style };
      const height = Number(pos.height);
      const width = Number(pos.width);
      const top = Number(pos.top);
      const left = Number(pos.left);
      const startX = downEvent.clientX;
      const startY = downEvent.clientY;

      // 是否需要保存快照
      let needSave = false;
      const move = (moveEvent) => {
        needSave = true;
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        const disY = currY - startY;
        const disX = currX - startX;
        const hasT = /t/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const hasR = /r/.test(point);
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
        pos.height = newHeight > 0 ? newHeight : 0;
        pos.width = newWidth > 0 ? newWidth : 0;
        pos.left = left + (hasL ? disX : 0);
        pos.top = top + (hasT ? disY : 0);
        this.$store.commit('setShapeStyle', pos);
      };

      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        needSave && this.$store.commit('recordSnapshot');
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },

    handleContextMenu(e) {
      e.stopPropagation();
      e.preventDefault();

      // 计算菜单相对于编辑器的位移
      const top = e.pageY;
      const left = e.pageX;

      this.$store.commit('showContexeMenu', { top, left, widgetObj: this.widgetObj });
    },
  },
};
</script>

<style lang="scss" scoped>
.vm-shape {
  position: absolute;
  border: 1px solid #ebebeb;
  border-radius: 2px;
  font-size: 0;
}
.active {
  border: 1px solid #70c0ff;
}
.shape-point {
  z-index: 100;
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.root-widget.active {
  border: none;
}
</style>
