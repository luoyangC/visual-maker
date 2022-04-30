<script lang="ts">
  import type { WidgetConfig } from '@/models/widget'
  import { defineComponent } from 'vue'
  import { widgetHook } from '@/hooks/widget'

  export default defineComponent({
    name: 'VmPreview',
    props: {
      widget: {
        type: Object,
        default: null
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    render() {
      return widgetHook.getWidgetPreview(this.widget.type, this.widget as WidgetConfig, this.data)
    }
  })
</script>
