<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <div class="vm-button-group">
      <div
        v-for="item in items"
        :key="item.index"
        :class="{
          'vm-button-item': true,
          'vm-button-item--disabled': isDisabled,
          'vm-button-item--active': checkActive(item)
        }"
        @click="handleClick(item)"
      >
        <vm-icon :name="item.icon" />
      </div>
    </div>
  </vm-form-item>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { isFunction, isDef, isArray } from '@/utils'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  interface itemType {
    index: number
    value: string
    icon: string
    click?: Function
    active?: Function
  }

  const props = defineProps<{
    modelValue?: string | Array<string>
    items?: Array<itemType>
    disabled?: boolean
    multiple?: boolean
  }>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string | Array<string>): void
    (e: 'change', value: string | Array<string>): void
  }>()

  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  const checkActive = (item: itemType) => {
    if (isFunction(item.active)) {
      return item.active?.(item)
    }
    if (isDef(item.active)) {
      return item.active
    }
    if (isArray(props.modelValue)) {
      return props.modelValue?.includes(item.value)
    }
    if (isDef(props.modelValue)) {
      return item.value === props.modelValue
    }
    return false
  }

  const handleClick = (item: itemType) => {
    const isActive = checkActive(item)

    if (isFunction(item.click)) {
      item.click?.(item, isActive)
      emits('change', props.modelValue || '')
    } else if (isArray(props.modelValue)) {
      if (isActive) {
        const index = props.modelValue?.indexOf(item.value)
        index && (props.modelValue as Array<string>).splice(index, 1)
      } else {
        item.value && (props.modelValue as Array<string>)?.push(item.value)
      }
      emits('change', props.modelValue || [])
    } else if (isDef(props.modelValue)) {
      emits('update:modelValue', isActive ? '' : item.value)
      emits('change', isActive ? '' : item.value)
    }
  }
</script>

<style lang="scss" scoped>
  .vm-button {
    &-group {
      display: flex;
    }
    &-item {
      padding: 6px 10px;
      border: 1px solid var(--el-border-color-base);
      border-left: 0;
      cursor: pointer;
      &--active {
        background-color: var(--el-border-color-lighter);
      }
      &--disabled {
        cursor: not-allowed;
        background-image: none;
        background-color: var(--el-disabled-bg-color);
        border-color: var(--el-disabled-border-color);
        color: var(--el-disabled-text-color);
        &:hover {
          background-color: var(--el-disabled-bg-color) !important;
        }
      }
      &:hover {
        background-color: #e1e4e7;
      }
      &:first-child {
        border-left: 1px solid var(--el-border-color-base);
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
      ::v-deep(.vm-icon:hover) {
        color: #409eff;
        background-color: transparent;
      }
    }
  }
</style>
