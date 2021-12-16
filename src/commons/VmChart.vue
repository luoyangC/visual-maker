<template>
  <div class="vm-chart">
    <div id="vmChartInner" ref="vmChartInner" style="height: 200px; width: 300px"></div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts'
  import { ref, onMounted } from 'vue'

  interface Props {
    option: any
  }
  const props = defineProps<Props>()

  const vmChartInner = ref()

  onMounted(() => {
    const vmChart = echarts.init(vmChartInner.value)
    vmChart.setOption(props.option)
  })
</script>

<style lang="scss" scoped>
  .vm-chart {
    width: 100%;
    height: 100%;
  }
</style>
