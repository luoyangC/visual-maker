<script lang="ts">
  import { widgetHook } from '@/hooks/widget'
  import { defineComponent } from 'vue'
  import type { WidgetConfig } from '@/models/widget'

  export default defineComponent({
    name: 'VmPreview',
    props: {
      widget: {
        type: Object,
        default: null
      }
    },
    render() {
      return widgetHook.getWidgetPreview(this.widget.type, this.widget as WidgetConfig)
    }
  })
</script>
