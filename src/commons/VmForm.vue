<template>
  <div class="vm-form">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { provide, computed, reactive } from 'vue'

  const props = defineProps<{ disabled?: boolean; size?: number }>()

  const disabled = computed(() => props.disabled)
  const size = computed(() => props.size)

  provide('vmForm', reactive({ disabled, size }))
</script>

<style lang="scss" scoped>
  .vm-form-item {
    display: flex;
    align-items: center;
    height: 32px;
  }
</style>
