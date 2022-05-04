<template>
  <div class="vm-chart">
    <div id="vmChartInner" ref="vmChartInner" :style="chartStyle"></div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts'
  import { ref, onMounted, computed, watch } from 'vue'

  const props = defineProps<{
    option: any
    width: number | string
    height: number | string
  }>()

  const vmChartInner = ref()
  const vmChart = ref()

  const chartStyle = computed(() => ({
    height: `${props.height}px`,
    width: `${props.width}px`
  }))

  watch(
    () => chartStyle.value,
    () => {
      vmChart.value.resize({ height: props.height, width: props.width })
    }
  )
  watch(
    () => props.option,
    () => {
      vmChart.value.setOption(props.option)
    },
    {
      deep: true
    }
  )

  onMounted(() => {
    vmChart.value = echarts.init(vmChartInner.value)
    vmChart.value.setOption(props.option)
  })
</script>

<style lang="scss" scoped>
  .vm-chart {
    width: 100%;
    height: 100%;
  }
</style>
