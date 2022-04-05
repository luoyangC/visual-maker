<template>
  <vm-collapse title="基础组件">
    <div class="widget-list mt-10" @dragstart="handleDragStart">
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
  </vm-collapse>
  <vm-collapse title="自定义组件">
    <div class="example-list" @dragstart="handleCustomDragStart">
      <div
        v-for="(item, index) in customList"
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
  import type { Example } from '@/api'
  import { ref } from 'vue'
  import { widgetHook } from '@/hooks/widget'
  import { getCustomExampleList } from '@/api'

  const widgetList = widgetHook.getDragTypeList()

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('widgetType', e.target.dataset.type)
  }

  const customList = ref<Array<Example>>([])

  const handleCustomDragStart = (e: any) => {
    e.dataTransfer.setData('async', true)
    e.dataTransfer.setData('exampleId', e.target.dataset.id)
  }

  getCustomExampleList().then((res) => {
    customList.value = res
  })
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
