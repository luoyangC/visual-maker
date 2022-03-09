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
    width: number | string
    height: number | string
  }
  const props = defineProps<Props>()

  const vmChartInner = ref()

  let vmChart: any

  const chartStyle = computed(() => ({
    height: `${props.height}px`,
    width: `${props.width}px`
  }))

  watch(
    () => chartStyle.value,
    () => {
      vmChart.resize({ height: props.height, width: props.width })
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
