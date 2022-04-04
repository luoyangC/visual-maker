<template>
  <div
    ref="VmShape"
    :class="{
      'vm-shape': true,
      'vm-shape--active': isActive,
      'vm-shape--root': isRoot
    }"
    :style="getShapeStyle(widget.style)"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @contextmenu="handleContextMenu"
  >
    <i v-if="showRotate" class="vm-shape-rotate iconfont icon-refresh" @mousedown="handleRotate" />
    <i
      v-for="(item, index) in showPoint ? pointList : []"
      :key="index"
      class="vm-shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item)"
    />
    <vm-widget class="vm-widget" :widget="widget" />
  </div>
</template>

<script setup lang="ts">
  import type { LooseOptions, WidgetConfig } from '@/models/widget'
  import { computed, ref } from 'vue'
  import { useStore } from '@/store'
  import { debounce } from '@/utils'

  type DirectionKey = 't' | 'b' | 'l' | 'r'

  const props = defineProps<{ widget: WidgetConfig }>()

  const store = useStore()

  const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']
  const directionKey = { t: 'n', b: 's', l: 'w', r: 'e' }
  const isRoot = props.widget.type === 'root'
  const isSettled = Boolean(props.widget.settled)

  const VmShape = ref()

  const curWidget = computed(() => store.getters['widget/current'])
  const isActive = computed(() => props.widget === curWidget.value)
  const isLock = computed(() => props.widget.lock)
  const isVirtual = computed(() => props.widget.virtual)
  const isAction = computed(() => store.getters['widget/isAction'])

  const showPoint = computed(
    () => isActive.value && !isRoot && !isSettled && !isLock.value && !isVirtual.value
  )
  const showRotate = computed(
    () => isActive.value && !isRoot && !isSettled && !isLock.value && !isAction.value
  )

  const getWidgetParent = (widget: WidgetConfig): any => {
    if (widget.parent?.type === 'root') {
      return widget
    }
    if (widget.parent?.type === 'slot') {
      return getWidgetParent(widget.parent)
    }
    return widget.parent
  }

  const getShapeStyle = (style?: LooseOptions) => {
    const restyle = {
      zIndex: props.widget.id,
      top: `${style?.top}px`,
      left: `${style?.left}px`,
      transform: `rotate(${style?.rotate}deg)`
    }
    return restyle
  }

  const getPointStyle = (point: string) => {
    const { width, height } = props.widget.style

    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)

    let newLeft = 0
    let newTop = 0

    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      if (hasT || hasB) {
        newLeft = Math.floor(width / 2)
        newTop = hasT ? 0 : height
      }
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = Math.floor(height / 2)
      }
    }

    const style = {
      marginLeft: hasR ? '-4px' : '-3px',
      marginTop: hasB ? '-4px' : '-3px',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: `${point
        .split('')
        .reverse()
        .map((m) => directionKey[m as DirectionKey])
        .join('')}-resize`
    }

    return style
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    store.dispatch('menu/hidden')
  }

  const handleRotate = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    const pos = { ...props.widget.style }
    const startY = e.clientY
    const startX = e.clientX
    const startRotate = pos.rotate
    const rect = VmShape.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)
    const move = debounce((moveEvent) => {
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY

      const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)

      pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
      store.dispatch('widget/setStyle', pos)
    })
    const up = debounce(() => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    })
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  const handleMouseDown = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    const isHandelEdge = e.offsetY < 5 || e.offsetX < 5
    const parent = getWidgetParent(props.widget)

    if (isHandelEdge) {
      store.dispatch('widget/setCurrent', parent)
      if (parent?.settled) return
      if (parent?.lock) return
    } else {
      store.dispatch('widget/setCurrent', props.widget)
      if (props.widget.settled) return
      if (props.widget.lock) return
    }

    const pos = isHandelEdge ? { ...parent?.style } : { ...props.widget.style }

    const startY = e.clientY
    const startX = e.clientX
    const startTop = Number(pos.top)
    const startLeft = Number(pos.left)

    const move = debounce((moveEvent) => {
      store.dispatch('widget/setAction', true)

      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      pos.top = curY - startY + startTop
      pos.left = curX - startX + startLeft

      store.dispatch('widget/setStyle', pos)
    })

    const up = debounce(() => {
      store.dispatch('widget/setAction', false)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    })

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  const handleMouseDownOnPoint = (point: string) => {
    const dowEvent: any = window.event
    dowEvent.stopPropagation()
    dowEvent.preventDefault()

    const pos = { ...props.widget.style }
    const height = Number(pos.height)
    const width = Number(pos.width)
    const minHeight = Number(pos.minHeight)
    const minWidth = Number(pos.minWidth)
    const top = Number(pos.top)
    const left = Number(pos.left)
    const startX = dowEvent.clientX
    const startY = dowEvent.clientY

    const move = debounce((moveEvent: any) => {
      store.dispatch('widget/setAction', true)

      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      const disY = curY - startY
      const disX = curX - startX
      const hasT = /t/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const hasR = /r/.test(point)
      const newHeight = height + (hasT ? -disY : hasB ? disY : 0)
      const newWidth = width + (hasL ? -disX : hasR ? disX : 0)

      if (newHeight <= minHeight || newWidth <= minWidth) return

      pos.height = newHeight > 0 ? newHeight : 0
      pos.width = newWidth > 0 ? newWidth : 0
      pos.left = left + (hasL ? disX : 0)
      pos.top = top + (hasT ? disY : 0)

      store.dispatch('widget/setStyle', pos)
    })

    const up = () => {
      store.dispatch('widget/setAction', false)

      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  const handleContextMenu = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const top = e.pageY
    const left = e.pageX
    store.dispatch('menu/show', { top, left })
  }
</script>

<style lang="scss" scoped>
  .vm-shape {
    position: absolute;
    font-size: 0;
    &::after {
      pointer-events: none;
      font-size: 0;
      position: absolute;
      content: '';
      left: 0px;
      top: 0px;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border-radius: 2px;
      background-color: transparent;
      border: 1px dashed #ebebeb;
    }
    &--active {
      &::after {
        z-index: 9999;
        border: 1px solid #70c0ff;
      }
    }
    &--root {
      position: relative !important;
      &::after {
        width: 0;
        height: 0;
      }
    }
    &-point {
      z-index: 10000;
      position: absolute;
      background: #fff;
      border: 1px solid #59c7f9;
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
    &-rotate {
      position: absolute;
      top: -34px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
      font-weight: 600;
      cursor: grab;
      color: #59c7f9;
      font-size: 20px;
      font-weight: 600;
      &:active {
        cursor: grabbing;
      }
    }
  }
</style>
