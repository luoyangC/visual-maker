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
  import { useStore } from '@/store'
  import { computed } from 'vue'

  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])
  const propConfigs = computed(() => curWidget.value.propConfigs)
</script>
