<template>
  <div id="editor" class="editor">
    <vm-shape :widget="rootWidget" />
    <!-- 右击菜单 -->
    <RightMenu />
    <!-- 标线 -->
    <!-- <mark-line /> -->
    <!-- 标尺 -->
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100vw - 665px);
    height: calc(100vh - 60px);
    overflow: hidden;
    background-color: #f5f5f5;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  }
</style>
