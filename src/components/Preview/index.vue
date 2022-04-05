<template>
  <el-dialog :model-value="modelValue" destroy-on-close @closed="emits('update:modelValue', false)">
    <vm-preview :widget="rootWidget" />
  </el-dialog>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { computed } from 'vue'
  import VmPreview from './VmPreview.vue'

  defineProps<{ modelValue: boolean }>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void
  }>()

  const widgetStore = useWidgetStore()
  const rootWidget = computed(() => widgetStore.root)
</script>
