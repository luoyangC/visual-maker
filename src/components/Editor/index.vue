<template>
  <div id="editor" class="editor">
    <vm-shape :key="rootWidget.id" :widget="rootWidget" />
    <!-- 右击菜单 -->
    <ContextMenu />
    <!-- 标线 -->
    <!-- <mark-line /> -->
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store'
  import { computed } from 'vue'
  import ContextMenu from './ContextMenu.vue'
  // import VmShape from './VmShape.vue'

  const store = useStore()
  const rootWidget = computed(() => store.getters['widget/root'])
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
