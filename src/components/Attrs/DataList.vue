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
  import { useStore } from '@/store'
  import { computed, watch, ref } from 'vue'
  import { chartHook } from '@/hooks/chart'
  import { useMessage } from '@/commons/useMessage'

  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])

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
        curWidget.value.subConfig.dataset = JSON.parse(jsonData.value)
      } catch (error) {
        if (jsonData.value) {
          useMessage({ mode: 'message', type: 'warning', message: 'json转换失败' })
        }
      }
    }
  )
</script>
