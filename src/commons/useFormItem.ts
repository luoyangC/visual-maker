import { useAttrs, inject, computed } from 'vue'

export const useFormItem = () => {
  const attrs = useAttrs()
  const vmForm = inject<{ disabled?: boolean; size?: number }>('vmForm', {})

  const label = attrs.label || ''
  const width = attrs.width || 260
  const vmDisabled = computed(() => vmForm.disabled)

  return { label, width, vmDisabled }
}
