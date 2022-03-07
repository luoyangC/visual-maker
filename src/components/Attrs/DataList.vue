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

  const store = useStore()

  const getJsonData = () => {
    if (curWidget.value.type === 'chart' && curWidget.value.subConfig) {
      return JSON.stringify(curWidget.value.subConfig.dataset, null, 2)
    }
    return ''
  }

  const curWidget = computed(() => store.getters['widget/current'])

  const jsonData = ref(getJsonData())

  watch(
    () => curWidget.value,
    () => {
      if (getJsonData() !== jsonData.value) {
        jsonData.value = getJsonData()
      }
    },
    { deep: true }
  )

  watch(
    () => jsonData.value,
    () => {
      try {
        curWidget.value.subConfig.dataset = JSON.parse(jsonData.value)
      } catch (error) {
        // console.log(error)
      }
    }
  )
</script>
