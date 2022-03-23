<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-input
      :model-value="innerValue"
      :type="type"
      :disabled="isDisabled"
      class="vm-input-unit"
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
      <template #append>
        <el-select
          v-model="unitModel"
          :disabled="isDisabled"
          class="vm-input-unit__select"
          @change="handleChangeUnit"
        >
          <el-option label="px" value="px" />
          <el-option label="%" value="%" />
          <el-option label="em" value="em" />
          <el-option label="vh" value="vh" />
          <el-option label="vw" value="vw" />
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

  const unitType = ['px', '%', 'em', 'vh', 'vw']

  interface Props {
    modelValue?: string
    title?: string
    icon?: string
    type?: string
    disabled?: boolean
    decimal?: number
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

  watch(
    () => props.modelValue,
    (val) => {
      if (props.type === 'length' && val) {
        passUnit(val)
      } else {
        innerValue.value = props.modelValue
      }
    },
    { immediate: true }
  )

  const passUnit = (val: string | number) => {
    const strValue = String(val)
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

  const handleInput = (val: string) => {
    emits('update:modelValue', val)
  }

  const handleChangeUnit = () => {
    emits('update:modelValue', innerValue.value + unitModel.value)
  }
</script>

<style>
  .el-input__prefix {
    left: 8px;
  }
  .el-input__inner {
    padding: 0 5px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 25px;
  }
  .el-input__inner::-webkit-inner-spin-button {
    margin: 0 -15px;
  }
  .el-input-group__append {
    padding: 0 14px;
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
    &-unit__select {
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
