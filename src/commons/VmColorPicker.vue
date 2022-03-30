<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-color-picker
      :model-value="modelValue"
      :show-alpha="showAlpha"
      :predefine="predefine"
      :disabled="isDisabled"
      @change="handleChange"
    />
  </vm-form-item>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { isDef } from '@/utils'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  interface Props {
    modelValue?: string
    showAlpha?: boolean
    predefine?: Array<string>
    disabled?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showAlpha: true,
    predefine: () => ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']
  })
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
    (e: 'change', value: string): void
  }>()

  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  const handleChange = (val: string) => {
    emits('update:modelValue', val || '')
    emits('change', val || '')
  }
</script>
