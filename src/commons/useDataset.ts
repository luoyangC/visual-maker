import type { WidgetConfig } from '@/models/widget'
import type { ComputedRef } from 'vue'
import { ref, watch, computed } from 'vue'
import { widgetHook } from '@/hooks/widget'
import { isDef } from '@/utils'

export const useDataset = (curWidget: ComputedRef<WidgetConfig>) => {
  const _instance = widgetHook.getWidget(curWidget.value.type)

  const hasStatic = computed(() => isDef(curWidget.value.props?.dataset))
  const hasDynamic = computed(() => isDef(curWidget.value.props?.dataApi))

  const showStatic = ref(Boolean(_instance.getWidgetDataset(curWidget.value)))
  const showDynamic = ref(Boolean(curWidget.value.props?.dataApi))
  const dataset = ref('')

  watch(
    () => curWidget,
    () => {
      dataset.value = _instance.getWidgetDataset(curWidget.value)
    },
    { deep: true, immediate: true }
  )

  watch(
    () => dataset.value,
    () => {
      _instance.setWidgetDataset(curWidget.value, dataset.value)
    }
  )

  return { hasStatic, showStatic, showDynamic, hasDynamic, dataset }
}
