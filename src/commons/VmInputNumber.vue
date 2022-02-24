<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-input-number
      :model-value="modelValue"
      class="vm-input-number"
      :disabled="isDisabled"
      @input="handleInput"
    />
  </vm-form-item>
</template>

<script setup lang="ts">
  import { isDef } from '@/utils'
  import { computed } from 'vue'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  const props = defineProps<{
    modelValue?: number
    disabled?: boolean
  }>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: number): void
    (e: 'input', value: number): void
  }>()

  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  const handleInput = (val: number) => {
    emits('update:modelValue', val)
    emits('input', val)
  }
</script>

<style lang="scss" scoped>
  .vm-input-number {
    width: 100%;
  }
</style>
