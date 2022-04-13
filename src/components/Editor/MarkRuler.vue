<template>
  <div
    class="mark-ruler mark-ruler-x"
    :style="{ left: xOffset - scrollLeft + 'px', width: xWidth + 'px' }"
  >
    <span
      v-for="(item, index) in xScaleList"
      :key="`${item}+${index}`"
      :class="['mark-ruler-scale', item % 5 && 'short']"
    >
      <span v-if="item % 5 === 0" class="mark-ruler-num">
        {{ item % 5 ? '' : item }}
      </span>
    </span>
  </div>
  <div
    class="mark-ruler mark-ruler-y"
    :style="{ top: yOffset - scrollTop + 'px', height: yHeight + 'px' }"
  >
    <span
      v-for="(item, index) in yScaleList"
      :key="`${item}+${index}`"
      :class="['mark-ruler-scale', item % 5 && 'short']"
    >
      <span v-if="item % 5 === 0" class="mark-ruler-num">
        {{ item % 5 ? '' : item }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch, nextTick } from 'vue'
  import { useWidgetStore } from '@/store/widget'
  import { useResize } from '@/commons/useResize'
  import { debounce } from '@/utils'

  const widgetStore = useWidgetStore()
  const root = computed(() => widgetStore.root)
  const rootSize = computed(() => ({
    width: root.value.style.width,
    height: root.value.style.height
  }))

  const xScaleList = ref<Array<number>>([])
  const yScaleList = ref<Array<number>>([])
  const xWidth = ref(0)
  const yHeight = ref(0)
  const xOffset = ref(0)
  const yOffset = ref(0)
  const scrollLeft = ref(0)
  const scrollTop = ref(0)

  const initMarkRuler = () => {
    let xLeaveWidth = 0
    let xOverWidth = 0
    let xStartLength = 0
    let xStartScaleList = []
    let xOverScaleList = []

    let yLeaveHeight = 0
    let yOverHeight = 0
    let yStartLength = 0
    let yStartScaleList = []
    let yOverScaleList = []

    const editor: any = document.getElementById('editor')

    const isXOverEditor = root.value.style.width + 100 > editor.clientWidth
    if (isXOverEditor) {
      xLeaveWidth = 50
      xOffset.value = 0
      xOverWidth = root.value.style.width + 50
      xStartScaleList = Array.from({ length: 5 }).map((_, index) => 5 - index)
      xOverScaleList = Array.from({ length: Math.floor(xOverWidth / 10) }).map((_, index) => index)
      editor.style.justifyContent = 'flex-start'
      xWidth.value = root.value.style.width + 100
    } else {
      xLeaveWidth = (editor.clientWidth - root.value.style.width) / 2
      xOverWidth = editor.clientWidth - xLeaveWidth
      xOffset.value = xLeaveWidth % 10
      xStartLength = Math.floor(xLeaveWidth / 10)
      xStartScaleList = Array.from({ length: xStartLength }).map((_, index) => xStartLength - index)
      xOverScaleList = Array.from({ length: Math.floor(xOverWidth / 10) }).map((_, index) => index)
      editor.style.justifyContent = 'center'
      xWidth.value = editor.clientWidth - xOffset.value - 10
    }

    const isYOverEditor = root.value.style.height + 100 > editor.clientHeight
    if (isYOverEditor) {
      yLeaveHeight = 50
      yOffset.value = 0
      yOverHeight = root.value.style.height + 50
      yStartScaleList = Array.from({ length: 5 }).map((_, index) => 5 - index)
      yOverScaleList = Array.from({ length: Math.floor(yOverHeight / 10) }).map((_, index) => index)
      editor.style.alignItems = 'flex-start'
      yHeight.value = root.value.style.height + 100
    } else {
      yLeaveHeight = (editor.clientHeight - root.value.style.height) / 2
      yOverHeight = editor.clientHeight - yLeaveHeight
      yOffset.value = yLeaveHeight % 10
      yStartLength = Math.floor(yLeaveHeight / 10)
      yStartScaleList = Array.from({ length: yStartLength }).map((_, index) => yStartLength - index)
      yOverScaleList = Array.from({ length: Math.floor(yOverHeight / 10) }).map((_, index) => index)
      editor.style.alignItems = 'center'
      yHeight.value = editor.clientHeight - yOffset.value - 10
    }

    xScaleList.value = [...xStartScaleList, ...xOverScaleList]
    yScaleList.value = [...yStartScaleList, ...yOverScaleList]
  }

  const listenScroll = debounce(() => {
    const editor: any = document.getElementById('editor')

    editor.onscroll = () => {
      scrollLeft.value = editor.scrollLeft
      scrollTop.value = editor.scrollTop
    }
  })

  useResize(initMarkRuler)

  watch(
    () => rootSize.value,
    () => {
      initMarkRuler()
    }
  )

  nextTick(() => {
    initMarkRuler()
    listenScroll()
  })
</script>

<style lang="scss" scoped>
  .mark-ruler {
    z-index: 100;
    position: absolute;
    overflow: hidden;
    background-color: #ebebeb;
    opacity: 0.8;
    &-x {
      z-index: 102;
      width: calc(100vw - 665px);
      height: 15px;
      top: 0px;
      left: 0px;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
    }
    &-y {
      z-index: 101;
      height: calc(100vh - 60px);
      width: 15px;
      top: 0px;
      left: 0px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    &-scale {
      flex: none;
      display: inline-flex;
      width: 10px;
      height: 10px;
    }
    &-num {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 1px;
      font-size: 12px;
      transform: scale(0.8);
    }
  }
  .mark-ruler-x {
    .mark-ruler-scale {
      border-left: 1px solid #5b6b73;
      writing-mode: horizontal-tb;
      height: 18px;
    }
    .short {
      height: 5px;
      opacity: 0.5;
    }
  }
  .mark-ruler-y {
    .mark-ruler-scale {
      border-top: 1px solid #5b6b73;
      writing-mode: vertical-lr;
      width: 18px;
    }
    .short {
      width: 5px;
      opacity: 0.5;
    }
  }
</style>
