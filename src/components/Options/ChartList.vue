<template>
  <div class="chart-list" @dragstart="handleDragStart">
    <vm-icon
      v-for="(item, index) in chartList"
      :key="index"
      :name="item.icon"
      :text="item.label"
      :data-type="item.type"
      draggable="true"
      size="24"
      class="chart-item"
    />
  </div>
</template>

<script setup lang="ts">
  import { chartHook } from '@/hooks/chart'

  const chartList = chartHook.getDragTypeList()

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('type', 'chart')
    e.dataTransfer.setData('subtype', e.target.dataset.type)
  }
</script>

<style lang="scss" scoped>
  .chart-list {
    display: flex;
    flex-wrap: wrap;
  }
  .chart-item {
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
