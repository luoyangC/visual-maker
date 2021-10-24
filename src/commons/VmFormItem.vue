<template>
  <div class="vm-form-item" :style="[innerWidth]">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps<{ width: number | string }>()

  const innerWidth = computed(() => `width: ${props.width || 260}px`)
</script>

<style lang="scss" scoped>
  .vm-form-item {
    display: flex;
    align-items: center;
    height: 32px;
  }
</style>
