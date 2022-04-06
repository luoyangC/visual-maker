<template>
  <div class="mark-ruler mark-ruler-x" :style="{ left: offsetX + 'px' }">
    <span
      v-for="(item, index) in xScaleList"
      :key="`${item}+${index}`"
      :class="['mark-ruler-scale', item % 5 && 'short']"
    >
      {{ item % 5 ? '' : item }}
    </span>
  </div>
  <div class="mark-ruler mark-ruler-y" :style="{ top: offsetY + 'px' }">
    <span
      v-for="(item, index) in yScaleList"
      :key="`${item}+${index}`"
      :class="['mark-ruler-scale', item % 5 && 'short']"
    >
      {{ item % 5 ? '' : item }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, nextTick } from 'vue'
  import { useWidgetStore } from '@/store/widget'

  const widgetStore = useWidgetStore()
  const root = computed(() => widgetStore.root)

  const xScaleList = ref<Array<number>>([])
  const yScaleList = ref<Array<number>>([])
  const offsetX = ref(0)
  const offsetY = ref(0)

  nextTick(() => {
    const editor: any = document.getElementById('editor')

    const overWidth = Math.floor((editor.clientWidth - root.value.style.width) / 20)
    const normalWidth = Math.floor(editor.clientWidth / 10) - overWidth
    const overXScaleList = Array.from({ length: overWidth }).map((_, index) => overWidth - index)
    const normalXScaleList = Array.from({ length: normalWidth }).map((_, index) => index)

    const overHeight = Math.floor((editor.clientHeight - root.value.style.height) / 20)
    const normalHeight = Math.floor(editor.clientHeight / 10) - overHeight
    const overYScaleList = Array.from({ length: overHeight }).map((_, index) => overHeight - index)
    const normalYScaleList = Array.from({ length: normalHeight }).map((_, index) => index)

    offsetX.value = (editor.clientWidth - root.value.style.width) / 2 - overWidth * 10 + 5
    offsetY.value = (editor.clientHeight - root.value.style.height) / 2 - overHeight * 10 + 5
    xScaleList.value = [...overXScaleList, ...normalXScaleList]
    yScaleList.value = [...overYScaleList, ...normalYScaleList]
  })
</script>

<style lang="scss" scoped>
  .mark-ruler {
    z-index: 100;
    position: absolute;
  }
  .mark-ruler-x {
    z-index: 102;
    width: calc(100vw - 665px);
    height: 15px;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .mark-ruler-scale {
      border-left: 1px solid #5b6b73;
      writing-mode: horizontal-tb;
      padding-left: 3px;
    }
    .short {
      height: 5px;
      opacity: 0.5;
    }
  }
  .mark-ruler-y {
    z-index: 101;
    height: calc(100vh - 60px);
    width: 15px;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .mark-ruler-scale {
      border-top: 1px solid #5b6b73;
      writing-mode: vertical-lr;
      padding-top: 3px;
    }
    .short {
      width: 5px;
      opacity: 0.5;
    }
  }
  .mark-ruler-scale {
    display: inline-block;
    width: 15px;
    height: 15px;
    font-size: 12px;
    transform: scale(0.8);
    opacity: 0.8;
    background-color: #ebebeb;
  }
</style>
