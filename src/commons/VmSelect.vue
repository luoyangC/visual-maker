<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-select
      :model-value="modelValue"
      class="vm-select"
      size="small"
      placeholder="请选择"
      :disabled="isDisabled"
      @change="handleChange"
    >
      <el-option
        v-for="item in items"
        :key="item[dictKey as string]"
        class="vm-select-item"
        :value="item[dictKey as string]"
        :label="item[dictName as string]"
      />
    </el-select>
  </vm-form-item>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { isDef } from '@/utils'
  import { useFormItem } from './useFormItem'

  interface Props {
    modelValue?: string
    items?: Array<any>
    dictKey?: string
    dictName?: string
    disabled?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    dictKey: 'value',
    dictName: 'label'
  })
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
    (e: 'change', value: string): void
  }>()

  const { width, label, vmDisabled } = useFormItem()
  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  const handleChange = (val: string) => {
    emits('update:modelValue', val)
    emits('change', val)
  }
</script>

<style lang="scss" scoped>
  .vm-select {
    width: 100%;
  }
</style>
