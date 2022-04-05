<template>
  <div class="prop-list">
    <vm-dynamic
      v-for="(item, index) in propConfigs"
      :key="index"
      :config="item"
      :widget="curWidget"
      class="mt-10"
    />
  </div>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { computed } from 'vue'

  const widgetStore = useWidgetStore()

  const curWidget = computed(() => widgetStore.current)
  const propConfigs = computed(() => curWidget.value.propConfigs)
</script>
