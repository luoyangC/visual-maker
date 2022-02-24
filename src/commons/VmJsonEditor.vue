<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <div class="vm-json-editor">
      <vm-code-mirror v-model="innerValue" :readonly="isDisabled" mode="application/json" />
    </div>
  </vm-form-item>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { isDef } from '@/utils'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  interface Props {
    modelValue?: object
    disabled?: boolean
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: object): void
  }>()

  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))
  const innerValue = ref('')
  innerValue.value = JSON.stringify(props.modelValue || {}, null, 2)

  watch(
    () => props.modelValue,
    () => {
      innerValue.value = JSON.stringify(props.modelValue || {}, null, 2)
    }
  )

  watch(
    () => innerValue.value,
    () => {
      try {
        emits('update:modelValue', JSON.parse(innerValue.value))
      } catch (error) {}
    }
  )
</script>

<style lang="scss" scoped>
  .vm-json-editor {
    width: 100%;
  }
</style>
