<template>
  <div
    :class="{ 'vm-slot': true, active: active, filled: isFilled }"
    @drop="handleDrop"
    @dragover="handleDragOver"
  >
    <slot />
    <vm-shape
      v-for="(item, index) in parentWidgetObj.children"
      :key="item.id"
      :z-index="index"
      :widget-obj="item"
    />
  </div>
</template>

<script>
import WidgetHook from '@/hooks/widget';
import { clone, generateID } from '@/utils/index';
import { mapState } from 'vuex';

export default {
  name: 'VmSlot',
  props: {
    parentWidgetObj: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapState([
      'curWidgetObj',
    ]),
    active() {
      return this.parentWidgetObj.parent === this.curWidgetObj;
    },
    isFilled() {
      return this.parentWidgetObj.restrict && this.parentWidgetObj.children.length;
    },
  },
  methods: {
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const widgetObj = clone(WidgetHook.getObject(e.dataTransfer.getData('type')));
      widgetObj.style.top = e.offsetY;
      widgetObj.style.left = e.offsetX;
      widgetObj.id = generateID();
      widgetObj.parent = this.parentWidgetObj;

      if (this.parentWidgetObj.restrict) {
        widgetObj.style.height = widgetObj.parent.style.height;
        widgetObj.style.width = widgetObj.parent.style.width;
        widgetObj.style.top = 0;
        widgetObj.style.left = 0;
      }

      this.$store.commit('addWidgetObj', { widgetObj: widgetObj, parentWidgetObj: this.parentWidgetObj });
      // this.$store.commit('recordSnapshot');
    },

    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },

    deselectCurWidgetObj() {
      this.$store.commit('setCurWidgetObj', { component: null, zIndex: null });
      this.$store.commit('hideContexeMenu');
    },
  },
};
</script>

<style lang="scss" scoped>
.vm-slot {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ebebeb;
  border-radius: 2px;
}
.active {
  border: 1px solid #E6A23C;
}
.filled {
  border: none;
}
</style>
