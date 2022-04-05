<template>
  <div v-show="display" class="vm-menu" :style="{ top: top + 'px', left: left + 'px' }">
    <ul>
      <li @click="delWidget">删除</li>
      <li @click="setWidgetLock">锁定</li>
      <li @click="copyWidget">复制</li>
      <li @click="pasteWidget">粘贴</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { useMenuStore } from '@/store/menu'
  import { storeToRefs } from 'pinia'

  const widgetStore = useWidgetStore()
  const menuStore = useMenuStore()
  const { top, left, display } = storeToRefs(menuStore)

  const delWidget = () => {
    widgetStore.delete()
    menuStore.hidden()
  }

  const setWidgetLock = () => {
    widgetStore.lock()
    menuStore.hidden()
  }

  const copyWidget = () => {}

  const pasteWidget = () => {}
</script>

<style lang="scss" scoped>
  .vm-menu {
    z-index: 1000;
    position: fixed;
    ul {
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      margin: 5px 0;
      padding: 5px 0;
      li {
        font-size: 14px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        cursor: pointer;
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
</style>
