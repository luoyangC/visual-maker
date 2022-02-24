<template>
  <div class="vm-chart">
    <div id="vmChartInner" ref="vmChartInner" :style="chartStyle"></div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts'
  import { ref, onMounted, computed, watch } from 'vue'

  interface Props {
    option: any
  }
  const props = defineProps<Props>()

  const vmChartInner = ref()

  let vmChart: any

  const chartStyle = computed(() => ({
    height: `${props.option.style.height}px`,
    width: `${props.option.style.width}px`,
    opacity: props.option.style.opacity,
    overflow: props.option.style.overflow
  }))

  watch(
    () => chartStyle.value,
    () => {
      vmChart.resize({ height: props.option.style.height, width: props.option.style.width })
    }
  )

  watch(
    () => props.option,
    () => {
      vmChart.setOption(props.option)
    },
    {
      deep: true
    }
  )

  onMounted(() => {
    vmChart = echarts.init(vmChartInner.value)
    vmChart.setOption(props.option)
  })
</script>

<style lang="scss" scoped>
  .vm-chart {
    width: 100%;
    height: 100%;
  }
</style>
