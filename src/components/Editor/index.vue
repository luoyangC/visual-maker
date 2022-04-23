<template>
  <div class="wrap">
    <div id="editor" class="editor">
      <vm-shape :widget="rootWidget" />
      <!-- 右击菜单 -->
      <RightMenu />
      <!-- 标线 -->
      <!-- <mark-line /> -->
      <!-- 标尺 -->
    </div>
    <MarkRuler />
  </div>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { computed } from 'vue'
  import RightMenu from './RightMenu.vue'
  import MarkRuler from './MarkRuler.vue'

  const widgetStore = useWidgetStore()
  const rootWidget = computed(() => widgetStore.root)
</script>

<style lang="scss" scoped>
  .editor {
    position: relative;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 665px);
    height: calc(100vh - 84px);
    background-color: #f5f5f5;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #dedfe1;
      border-radius: 32px;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #909399;
      }
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 32px;
    }
  }
  .wrap {
    position: relative;
    overflow: hidden;
  }
</style>
