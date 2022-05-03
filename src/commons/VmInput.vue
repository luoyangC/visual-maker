<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-input
      :model-value="modelValue"
      :type="type"
      :disabled="isDisabled"
      class="vm-input"
      @input="handleInput"
    >
      <template v-if="showPrefix" #prefix>
        <div class="vm-input__prefix">
          <span>{{ title }}</span>
          <svg class="vm-icon_svg" aria-hidden="true" style="font-size: 16px">
            <use :xlink:href="iconName" />
          </svg>
        </div>
      </template>
    </el-input>
  </vm-form-item>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { isDef } from '@/utils'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  interface Props {
    modelValue?: string | number
    title?: string
    icon?: string
    type?: string
    disabled?: boolean
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string | number): void
    (e: 'input', value: string | number): void
  }>()

  const iconName = computed(() => `#icon-${props.icon}`)
  const showPrefix = computed(() => props.title || props.icon)
  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  watch(
    () => props.modelValue,
    (val) => {
      if (props.type === 'number') {
        val && emits('update:modelValue', Math.floor((val as number) * 100 + 0.01) / 100)
      }
    },
    { immediate: true }
  )

  const handleInput = (val: string | number) => {
    emits('update:modelValue', val)
    emits('input', val)
  }
</script>

<style>
  .el-input__prefix {
    left: 8px;
  }
  .el-input__inner::-webkit-inner-spin-button {
    margin: 1px -0px;
  }
</style>

<style lang="scss" scoped>
  .vm-input {
    width: 100%;
    &__prefix {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 16px;
      height: 100%;
      user-select: none;
      color: rgb(141, 158, 167);
    }
  }
</style>
