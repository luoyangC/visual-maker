<template>
  <el-dialog :model-value="modelValue" destroy-on-close @closed="emits('update:modelValue', false)">
    <div v-loading="loading" class="vm-preview__wrap">
      <vm-preview v-if="!loading" :widget="rootWidget" :data="previewData" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { WidgetConfig } from '@/models/widget/widget.type'
  import { widgetHook } from '@/hooks/widget'
  import { useWidgetStore } from '@/store/widget'
  import { watch, ref } from 'vue'
  import { clone } from '@/utils'
  import VmPreview from './VmPreview.vue'

  const props = defineProps<{ modelValue: boolean }>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void
  }>()

  const widgetStore = useWidgetStore()

  const loading = ref(true)
  const rootWidget = ref({})
  const previewData = ref({})

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        rootWidget.value = clone(widgetStore.root)
        widgetHook.getWidgetPreviewData(rootWidget.value as WidgetConfig).then((res) => {
          const _data = {}
          res.forEach((_obj) => {
            Object.assign(_data, _obj)
          })
          previewData.value = _data
          loading.value = false
        })
      } else {
        previewData.value = {}
        loading.value = true
      }
    }
  )
</script>

<style lang="scss" scoped>
  .vm-preview__wrap {
    min-width: 500px;
    min-height: 400px;
    max-width: 1000px;
    max-height: 800px;
    overflow-y: overlay;
    overflow-x: overlay;
  }
</style>
