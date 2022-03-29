<template>
  <div
    ref="VmSlot"
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
  import { computed, ref } from 'vue'
  import { useStore } from '@/store'
  import { widgetHook } from '@/hooks/widget'
  import { useMessage } from '@/commons/useMessage'

  const props = defineProps<{ widget: WidgetConfig }>()
  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])
  const isParentActive = computed(() => props.widget.parent === curWidget.value)

  const isRoot = props.widget?.parent?.type === 'root'
  const isSlotSettled = Boolean(props.widget.settled)
  const isSlotFilled = computed(() => isSlotSettled && props.widget.children?.length)

  const VmSlot = ref()

  const handleDrop = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    // 固定插槽内容不可拖动更新
    if (isSlotFilled.value) {
      return
    }

    // 获取组件配置
    const widgetName = e.dataTransfer.getData('widgetType')
    const subtype = e.dataTransfer.getData('subtype')
    const async = e.dataTransfer.getData('async')
    const exampleId = e.dataTransfer.getData('exampleId')

    const innerWidget = async
      ? await widgetHook.getWidgetExample(exampleId)
      : widgetHook.getWidgetConfig(widgetName, { subtype })

    // 设置父组件
    innerWidget.parent = props.widget

    if (isSlotSettled) {
      // 插槽为固定插槽，长宽设为父组件长宽，定位设为0
      if (
        props.widget.style.height < innerWidget.style.minHeight ||
        props.widget.style.width < innerWidget.style.minWidth
      ) {
        return useMessage({
          mode: 'message',
          type: 'warning',
          message: '进不去，怎么想都进不去！！！'
        })
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
      const slotWidth = isSlotSettled ? props.widget.style.width : props.widget.parent?.style.width
      const slotHeight = isSlotSettled
        ? props.widget.style.height
        : props.widget.parent?.style.height

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

      const move = (moveEvent: any) => {
        moveEvent.preventDefault()
        moveEvent.stopPropagation()

        store.dispatch('widget/setAction', true)
        createVirtualWidget()

        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        const height = curY - startY
        const width = curX - startX

        if (moveEvent.offsetX >= slotWidth - 1 || moveEvent.offsetY >= slotHeight - 1) {
          store.dispatch('widget/delete')
        } else {
          store.dispatch('widget/setStyle', { height, width })
        }
      }

      const up = () => {
        store.dispatch('widget/setAction', false)
        VmSlot.value.removeEventListener('mousemove', move)
        VmSlot.value.removeEventListener('mouseup', up)

        if (isMove) {
          isMove = false
          e.stopPropagation()
          const res = findIntersection()
          !res && store.dispatch('widget/delete')
        }
      }

      VmSlot.value.addEventListener('mousemove', move)
      VmSlot.value.addEventListener('mouseup', up)
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
