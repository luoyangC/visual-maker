<template>
  <div v-if="label" class="vm-label">{{ label }}</div>
</template>

<script setup lang="ts">
  defineProps<{ label?: string }>()
</script>

<style lang="scss" scoped>
  .vm-label {
    display: inline-block;
    width: 80px;
    font-size: 14px;
    padding-left: 2px;
    flex-shrink: 0;
    text-align: start;
  }
</style>
