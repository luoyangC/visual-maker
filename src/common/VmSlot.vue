<template>
  <div
    :class="{ 'vm-slot': true, active: active }"
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
      console.log(this.curWidgetObj);
      return this.parentWidgetObj.parent === this.curWidgetObj;
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
  width: 100%;
  height: 100%;
}
.active {
  border: 1px solid #70c0ff;
}
.vm-slot.active {
  width: calc(100% - 2px);
  height: calc(100% - 2px);
}
</style>
