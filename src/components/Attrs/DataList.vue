<template>
  <div class="data-list">
    <vm-code-mirror v-model="jsonData" mode="application/json" :readonly="false" />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store'
  import { computed, watch, ref } from 'vue'

  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])

  const jsonData = ref('')
  jsonData.value = JSON.stringify(curWidget.value.subConfig.dataset, null, 2)

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
