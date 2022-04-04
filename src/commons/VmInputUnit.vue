<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-input
      :model-value="innerData"
      :disabled="isDisabled"
      type="number"
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
      <template #suffix>
        <div v-if="showStep" class="vm-input-unit__step">
          <div class="vm-input-unit__increase" @click.stop="handleIncrease">
            <i class="vm-input-unit__step-icon iconfont icon-arrow-right" />
          </div>
          <div class="vm-input-unit__decrease" @click.stop="handleDecrease">
            <i class="vm-input-unit__step-icon iconfont icon-arrow-right" />
          </div>
        </div>
      </template>
      <template #append>
        <el-select
          v-model="unitData"
          :disabled="isDisabled || innerData === undefined"
          class="vm-input-unit__select"
          @change="handleChangeUnit"
        >
          <el-option v-for="item in unitTypeList" :key="item" :label="item" :value="item" />
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

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: false
    },
    title: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    unitTypeList: {
      type: Array as () => Array<string>,
      default: (): Array<string> => ['px', '%']
    }
  })
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

  const unitData = ref<string | undefined>('px')
  const innerData = ref<number | undefined>()

  const iconName = computed(() => `#icon-${props.icon}`)
  const showPrefix = computed(() => props.title || props.icon)
  const showStep = computed(() => innerData.value !== undefined)
  const isDisabled = computed(() => props.disabled || vmDisabled.value || !isDef(props.modelValue))

  const setInnerAndUnitData = () => {
    const strValue = String(props.modelValue)

    if (strValue === '' || strValue === 'auto' || strValue === 'undefined') {
      innerData.value = undefined
      unitData.value = 'px'
      return undefined
    }

    if (!isNaN(Number(strValue))) {
      innerData.value = Number(strValue)
      unitData.value = 'px'
      return emits('update:modelValue', innerData.value + unitData.value)
    }

    props.unitTypeList.forEach((unit) => {
      if (strValue.endsWith(unit)) {
        const tempValue = strValue.replace(unit, '')
        if (!isNaN(Number(tempValue))) {
          innerData.value = Number(tempValue)
          unitData.value = unit
          return emits('update:modelValue', innerData.value + unitData.value)
        }
      }
    })
  }

  watch(() => props.modelValue, setInnerAndUnitData, { immediate: true })

  const handleInput = (val: string) => {
    innerData.value = Number(val)
    unitData.value && emits('update:modelValue', innerData.value + unitData.value)
  }

  const handleChangeUnit = (val: string) => {
    unitData.value = val
    innerData.value && emits('update:modelValue', innerData.value + unitData.value)
  }

  const handleIncrease = () => {
    innerData.value !== undefined && innerData.value++
    unitData.value && emits('update:modelValue', innerData.value + unitData.value)
  }

  const handleDecrease = () => {
    innerData.value !== undefined && innerData.value--
    unitData.value && emits('update:modelValue', innerData.value + unitData.value)
  }
</script>

<style lang="scss" scoped>
  .vm-input-unit {
    width: 100%;
    ::v-deep(.el-input-group__append) {
      padding: 0 18px;
    }
    ::v-deep(.el-input__inner) {
      padding-right: 25px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      &[type='number'] {
        -moz-appearance: textfield;
      }
    }
    ::v-deep(.el-input__suffix) {
      right: 5px;
    }
    &:hover {
      .vm-input-unit__step {
        opacity: 1;
      }
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
    &__step {
      opacity: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: all 0.1s cubic-bezier(0, 0, 1, 1);
      &-icon {
        font-size: 12px;
        height: 13px;
        width: 16px;
        color: var(--el-input-text-color);
      }
    }
    &__decrease,
    &__increase {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f2f3f5;
      border-radius: var(--el-input-border-radius);
      cursor: pointer;
      user-select: none;
      transition: all 0.1s cubic-bezier(0, 0, 1, 1);
      &:hover {
        background-color: #c9cdd4;
      }
    }
    &__decrease {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      .iconfont {
        transform: rotate(90deg);
      }
    }
    &__increase {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      .iconfont {
        transform: rotate(270deg);
      }
    }
    &__select {
      width: 36px;
      ::v-deep(.el-input__inner) {
        padding: 0 10px !important;
        border: none;
      }
      ::v-deep(.el-input__suffix) {
        display: none;
      }
    }
  }
  .is-disabled .vm-input-unit__step {
    display: none;
  }
</style>
