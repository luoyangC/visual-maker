<template>
  <div v-show="display" class="right-menu" :style="{ top: top + 'px', left: left + 'px' }">
    <ul>
      <li v-show="showDelete" @click="delWidget">删除</li>
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
  import { computed } from 'vue'
  import { isDef } from '@/utils'
  import { copy } from '@/utils'
  import { widgetHook } from '@/hooks/widget'
  import { useMessage } from '@/commons/useMessage'

  const widgetStore = useWidgetStore()
  const menuStore = useMenuStore()
  const { top, left, offsetX, offsetY, display } = storeToRefs(menuStore)
  const curWidget = computed(() => widgetStore.current)

  const showDelete = computed(() => {
    return isDef(curWidget.value?.closable) ? curWidget.value?.closable : true
  })

  const delWidget = () => {
    widgetStore.delete()
    menuStore.hidden()
  }

  const setWidgetLock = () => {
    widgetStore.lock()
    menuStore.hidden()
  }

  const copyWidget = () => {
    const widgetData = widgetHook.widgetToJson(curWidget.value)
    copy({ text: JSON.stringify(widgetData, null, 2) })
    menuStore.hidden()
  }

  const pasteWidget = () => {
    navigator.clipboard.readText().then((res) => {
      if (!curWidget.value.children?.[0]) return

      try {
        const innerWidget = widgetHook.jsonToWidget(JSON.parse(res), curWidget.value.children[0])
        // 设置父组件
        innerWidget.parent = curWidget.value.children[0]

        innerWidget.style.top = offsetY.value
        innerWidget.style.left = offsetX.value
        widgetStore.push({ current: innerWidget, parent: curWidget.value.children[0] })
        menuStore.hidden()
      } catch (error) {
        useMessage({ mode: 'message', type: 'warning', message: '复制错误' })
      }
    })
  }
</script>

<style lang="scss" scoped>
  .right-menu {
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
