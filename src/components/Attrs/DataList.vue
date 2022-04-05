<template>
  <div class="data-list">
    <vm-code-mirror
      :key="curWidget.id"
      v-model="jsonData"
      :readonly="false"
      mode="application/json"
    />
  </div>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { computed, watch, ref } from 'vue'
  import { chartHook } from '@/hooks/chart'
  import { useMessage } from '@/commons/useMessage'

  const widgetStore = useWidgetStore()

  const curWidget = computed(() => widgetStore.current)

  const jsonData = ref<string>(chartHook.getChartDataList(curWidget.value))

  watch(
    () => curWidget.value,
    () => {
      if (chartHook.getChartDataList(curWidget.value) !== jsonData.value) {
        jsonData.value = chartHook.getChartDataList(curWidget.value)
      }
    }
  )

  watch(
    () => jsonData.value,
    () => {
      try {
        if (curWidget.value.subConfig) {
          curWidget.value.subConfig.dataset = JSON.parse(jsonData.value)
        }
      } catch (error) {
        if (jsonData.value) {
          useMessage({ mode: 'message', type: 'warning', message: 'json转换失败' })
        }
      }
    }
  )
</script>
