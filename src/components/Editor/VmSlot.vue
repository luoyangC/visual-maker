<template>
  <div
    :class="{
      'vm-slot': true,
      'vm-slot--root': isRoot,
      'vm-slot--filled': isSlotFilled,
      'vm-slot--active': isParentActive
    }"
    :style="{ zIndex: widget.id }"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <slot />
    <vm-shape v-for="item in widget.children" :key="item.id" :widget="item" />
  </div>
</template>

<script setup lang="ts">
  import type { WidgetConfig } from '@/models/widget'
  import { computed } from 'vue'
  import { useStore } from '@/store'
  import { widgetHook } from '@/hooks/widget'
  import { useMessage } from '@/commons/useMessage'
  import { debounce } from '@/utils'

  const props = defineProps<{ widget: WidgetConfig }>()
  const store = useStore()
  const message = useMessage()

  const curWidget = computed(() => store.getters['widget/current'])
  const isParentActive = computed(() => props.widget.parent === curWidget.value)

  const isRoot = props.widget?.parent?.type === 'root'
  const isSlotSettled = Boolean(props.widget.settled)
  const isSlotFilled = computed(() => isSlotSettled && props.widget.children?.length)

  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    // 获取组件配置
    const widgetName = e.dataTransfer.getData('type')
    const innerWidget = widgetHook.getWidgetConfig(widgetName)

    // 设置父组件
    innerWidget.parent = props.widget

    if (isSlotSettled) {
      // 插槽为固定插槽，长宽设为父组件长宽，定位设为0
      if (
        props.widget.style.height < innerWidget.style.minHeight ||
        props.widget.style.width < innerWidget.style.minWidth
      ) {
        return message.alert('进不去，怎么想都进不去', { confirmButtonText: '确定' })
      }
      innerWidget.style.height = props.widget.style.height
      innerWidget.style.width = props.widget.style.width
      innerWidget.style.top = 0
      innerWidget.style.left = 0
      innerWidget.settled = true
    } else {
      // 根据拖动事件设置定位
      innerWidget.style.top = e.offsetY
      innerWidget.style.left = e.offsetX
    }
    store.dispatch('widget/push', { current: innerWidget, parent: props.widget })
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    store.dispatch('menu/hidden')
  }

  const handleMouseDown = (e: any) => {
    e.preventDefault()
    if (!isSlotSettled) {
      const startY = e.clientY
      const startX = e.clientX

      let isMove = false

      const createVirtualWidget = () => {
        if (isMove) return

        const virtualWidget = widgetHook.getWidgetConfig('virtual')
        virtualWidget.parent = props.widget
        virtualWidget.style.top = e.offsetY
        virtualWidget.style.left = e.offsetX

        store.dispatch('widget/push', { current: virtualWidget, parent: props.widget })
        store.dispatch('widget/setCurrent', virtualWidget)

        isMove = true
      }

      const findIntersection = () => {
        const widgets = props.widget.children || []
        if (widgets?.length <= 1) return false

        const curCoord = [
          curWidget.value.style.top,
          curWidget.value.style.left,
          curWidget.value.style.top + curWidget.value.style.height,
          curWidget.value.style.left + curWidget.value.style.width
        ]
        const intersections: Array<WidgetConfig> = []

        widgets.forEach((item) => {
          const coord = [
            item.style.top,
            item.style.left,
            item.style.top + item.style.height,
            item.style.left + item.style.width
          ]
          if (
            curCoord[0] < coord[0] &&
            curCoord[1] < coord[1] &&
            curCoord[2] > coord[2] &&
            curCoord[3] > coord[3]
          ) {
            intersections.push(item)
            store.dispatch('widget/push', { current: item, parent: curWidget.value })
          }
        })
        return intersections.length
      }

      const move = debounce((moveEvent) => {
        store.dispatch('widget/setAction', true)
        createVirtualWidget()

        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const height = currY - startY
        const width = currX - startX

        store.dispatch('widget/setStyle', { height, width })
      })

      const up = debounce(() => {
        store.dispatch('widget/setAction', false)
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)

        if (isMove) {
          isMove = false
          e.stopPropagation()
          const res = findIntersection()
          !res && store.dispatch('widget/delete')
        }
      })

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  }
</script>

<style lang="scss" scoped>
  .vm-slot {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dashed #ebebeb;
    border-radius: 2px;
    &--root {
      border: none;
    }
    &--active {
      border: 1px solid #e6a23c;
    }
    &--filled {
      border: none;
    }
  }
</style>
