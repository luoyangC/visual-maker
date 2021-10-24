<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-slider v-model="innerData" class="vm-slider" :show-tooltip="false" :disabled="isDisabled" />
    <vm-input v-model="innerData" width="58" type="number" class="ml-20" :disabled="isDisabled" />
  </vm-form-item>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { isDef } from '@/utils'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  interface Props {
    modelValue?: number
    convert?: number
    disabled?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: 1,
    convert: 100
  })
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: number): void
  }>()

  const innerData = ref(props.modelValue * props.convert)
  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  watch(
    () => props.modelValue,
    () => {
      innerData.value = props.modelValue * props.convert
    }
  )
  watch(innerData, (nv) => {
    emits('update:modelValue', Number(nv) / props.convert)
  })
</script>

<style lang="scss" scoped>
  .vm-slider {
    flex-grow: 1;
    margin: 0;
    ::v-deep(.el-slider) {
      height: 28px;
    }
    ::v-deep(.el-slider__runway) {
      height: 3px;
      margin: 12.5px 0;
    }
    ::v-deep(.el-slider__button-wrapper) {
      width: 28px;
      height: 28px;
      top: -13px;
    }
    ::v-deep(.el-slider__button) {
      width: 8px;
      height: 8px;
    }
    ::v-deep(.el-slider__bar) {
      height: 3px;
    }
  }
</style>
