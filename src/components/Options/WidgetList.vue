<template>
  <div class="widget-list" @dragstart="handleDragStart">
    <vm-icon
      v-for="(item, index) in widgetList"
      :key="index"
      :data-index="index"
      draggable
      class="widget-item"
      :name="item.icon"
      size="24"
      :text="item.label"
    />
  </div>
</template>

<script>
import WidgetHook from '@/hooks/widget';

export default {
  data() {
    return {
      widgetList: [],
    };
  },
  created() {
    this.widgetList = WidgetHook.getDragTypeList();
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-list {
  display: flex;
  flex-wrap: wrap;
}
.widget-item {
  text-align: center;
  width: 50px;
  height: 50px;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f8fafc;
  cursor: pointer;
  color: #5b6b73;
  transition: all 0.2s ease-out 0s;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  &:hover {
    background-color: #e1e4e7;
  }
}
</style>
