<template>
  <div id="editor" class="editor">
    <vm-shape :widget="rootWidget" />
    <!-- 右击菜单 -->
    <VmMenu />
    <!-- 标线 -->
    <!-- <mark-line /> -->
  </div>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { computed } from 'vue'
  import VmMenu from './VmMenu.vue'

  const widgetStore = useWidgetStore()
  const rootWidget = computed(() => widgetStore.root)
</script>

<style lang="scss" scoped>
  .editor {
    position: relative;
    background-color: #fff;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
    max-height: 800px;
    max-width: 1000px;
  }
</style>
