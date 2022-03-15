<template>
  <vm-collapse title="基础图表">
    <div class="chart-list mt-10" @dragstart="handleDragStart">
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
  </vm-collapse>
  <vm-collapse title="图表样例">
    <div class="example-list" @dragstart="handleExampleDragStart">
      <div
        v-for="(item, index) in chartExampleList"
        :key="index"
        :data-id="item.id"
        draggable="true"
        class="example-item"
      >
        <img class="example-item__image" :src="item.icon" :data-id="item.id" />
      </div>
    </div>
  </vm-collapse>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { chartHook } from '@/hooks/chart'
  import type { Example } from '@/api'
  import { getChartExampleList } from '@/api'

  const chartList = chartHook.getDragTypeList()
  const chartExampleList = ref<Array<Example>>([])

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('widgetType', 'chart')
    e.dataTransfer.setData('subtype', e.target.dataset.type)
  }

  const handleExampleDragStart = (e: any) => {
    e.dataTransfer.setData('async', true)
    e.dataTransfer.setData('exampleId', e.target.dataset.id)
  }

  getChartExampleList().then((res) => {
    chartExampleList.value = res
  })
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
  .example-list {
    display: flex;
    flex-wrap: wrap;
  }
  .example-item {
    width: 70px;
    height: 70px;
    padding: 10px;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #f8fafc;
    &:nth-child(3n) {
      margin-right: 0px;
    }
    &__image {
      width: 50px;
      height: 50px;
      object-fit: contain;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: scale(1.8);
      }
    }
  }
</style>
