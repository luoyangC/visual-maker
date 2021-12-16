<script lang="ts">
  import { dynamicHook } from '@/hooks/dynamic'
  import { defineComponent, h } from 'vue'
  import type { WidgetDynamicConfig, WidgetConfig } from '@/models/widget'

  export default defineComponent({
    name: 'VmDynamic',
    props: {
      config: {
        type: Object,
        default: null
      },
      widget: {
        type: Object,
        default: null
      },
      modelType: {
        type: String,
        default: 'props'
      }
    },
    render() {
      const template = dynamicHook
        .getDynamic(this.config.type)
        .getTemplate(
          this.config as WidgetDynamicConfig,
          this.widget[this.modelType],
          this.widget as WidgetConfig
        )
      return h('div', { class: 'vm-dynamic' }, [template])
    }
  })
</script>
