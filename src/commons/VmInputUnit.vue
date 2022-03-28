<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-input
      :model-value="innerValue"
      :disabled="isDisabled"
      class="vm-input-unit"
      @input="handleInput"
    >
      <template v-if="showPrefix" #prefix>
        <div class="vm-input-unit__prefix">
          <span>{{ title }}</span>
          <svg class="vm-icon_svg" aria-hidden="true" style="font-size: 16px">
            <use :xlink:href="iconName" />
          </svg>
        </div>
      </template>
      <template #append>
        <el-select
          v-model="unitModel"
          :disabled="isDisabled"
          class="vm-input-unit__select"
          @change="handleChangeUnit"
        >
          <el-option label="px" value="px" />
          <el-option label="%" value="%" />
        </el-select>
      </template>
    </el-input>
  </vm-form-item>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { isDef } from '@/utils'
  import { useFormItem } from './useFormItem'

  const { width, label, vmDisabled } = useFormItem()

  const unitType = ['px', '%']

  interface Props {
    modelValue?: string | number
    title?: string
    icon?: string
    disabled?: boolean
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

  const unitModel = ref('px')
  const innerValue = ref<string | undefined>('')

  const iconName = computed(() => `#icon-${props.icon}`)
  const showPrefix = computed(() => props.title || props.icon)
  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  const initData = () => {
    const strValue = String(props.modelValue)
    if (!isNaN(Number(strValue))) {
      unitModel.value = 'px'
      innerValue.value = strValue
    }
    unitType.forEach((unit) => {
      if (strValue.endsWith(unit)) {
        unitModel.value = unit
        innerValue.value = strValue.replace(unit, '')
      }
    })
    emits('update:modelValue', innerValue.value + unitModel.value)
  }

  watch(
    () => props.modelValue,
    () => {
      initData()
    },
    { immediate: true }
  )

  const handleInput = (val: string) => {
    innerValue.value = val
    emits('update:modelValue', innerValue.value + unitModel.value)
  }

  const handleChangeUnit = () => {
    emits('update:modelValue', innerValue.value + unitModel.value)
  }
</script>

<style lang="scss" scoped>
  .vm-input-unit {
    width: 100%;
    ::v-deep(.el-input-group__append) {
      padding: 0 14px;
    }
    ::v-deep(.el-input__inner) {
      padding-right: 5px;
    }
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
    &__select {
      width: 28px;
      ::v-deep(.el-input__inner) {
        padding: 0 5px;
        border: none;
      }
      ::v-deep(.el-input__suffix) {
        display: none;
      }
    }
  }
</style>
