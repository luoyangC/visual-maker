<template>
  <div class="widget-list" @dragstart="handleDragStart">
    <vm-icon
      v-for="(item, index) in widgetList"
      :key="index"
      :name="item.icon"
      :text="item.label"
      :data-type="item.type"
      draggable="true"
      size="24"
      class="widget-item"
    />
  </div>
</template>

<script setup lang="ts">
  import { widgetHook } from '@/hooks/widget'

  const widgetList = widgetHook.getDragTypeList()

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('type', e.target.dataset.type)
  }
</script>

<style lang="scss" scoped>
  .widget-list {
    display: flex;
    flex-wrap: wrap;
  }
  .widget-item {
    text-align: center;
    width: 70px;
    height: 70px;
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
