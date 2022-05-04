<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <div :class="['vm-input-array', { 'vm-input-array--focus': isFocus }]" @click="handleActive">
      <span class="vm-input-array__tags">
        <el-tag
          v-for="(item, index) in tags"
          :key="`${item}${index}`"
          class="vm-input-array__tags-item"
          type="info"
          closable
          @close="handleClose(index)"
        >
          {{ item }}
        </el-tag>
      </span>
      <input
        ref="inputInner"
        v-model="innerData"
        class="vm-input-array__inner"
        type="text"
        :disabled="isDisabled"
        @blur="handleBlur"
      />
    </div>
  </vm-form-item>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { isDef } from '@/utils'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  const props = defineProps<{
    modelValue?: Array<string>
    disabled?: boolean
  }>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: Array<string>): void
  }>()

  const innerData = ref('')
  const isFocus = ref(false)
  const inputInner = ref()

  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))
  const tags = computed(() => props.modelValue)

  const handleActive = () => {
    isFocus.value = true
    inputInner.value.focus()
  }
  const handleBlur = () => {
    isFocus.value = false
    if (!innerData.value) return false

    const _tags = [...(props.modelValue || [])]
    _tags.push(innerData.value)
    emits('update:modelValue', _tags)
    innerData.value = ''
  }

  const handleClose = (index: number) => {
    const _tags = [...(props.modelValue || [])]
    _tags.splice(index, 1)
    emits('update:modelValue', _tags)
  }
</script>

<style lang="scss" scoped>
  .vm-input-array {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: normal;
    white-space: normal;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    border: var(--el-input-border, var(--el-border-base));
    &--focus {
      outline: 0;
      border-color: var(--el-input-focus-border, var(--el-color-primary));
    }
    &__tags {
      display: inline-flex;
      flex-wrap: wrap;
      margin-left: 6px;
      &-item {
        border-color: transparent;
        margin: 2px 6px 2px 0;
      }
    }
    &__inner {
      flex-grow: 1;
      height: 28px;
      width: 0.1%;
      margin-left: 6px;
      padding: 0;
      border: none;
      outline: none;
      appearance: none;
      background-color: transparent;
    }
  }
</style>
