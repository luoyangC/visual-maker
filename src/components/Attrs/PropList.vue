<template>
  <div class="prop-list">
    <div class="prop-conponent">
      <vm-dynamic
        v-for="(item, index) in propConfigs"
        :key="index"
        :config="item"
        :widget="curWidget"
        class="mt-10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store'
  import { computed } from 'vue'

  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])
  const propConfigs = computed(() => curWidget.value.propConfigs)
</script>

<style lang="scss" scoped>
  .prop-conponent {
    display: flex;
    flex-direction: column;
  }
</style>
