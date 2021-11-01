<script lang="ts">
  import { widgetHook } from '@/hooks/widget'
  import { defineComponent } from 'vue'
  import type { WidgetConfig } from '@/models/widget'

  export default defineComponent({
    name: 'VmWidget',
    props: {
      widget: {
        type: Object,
        default: null
      }
    },
    render() {
      return widgetHook.getWidgetTemplate(this.widget.type, this.widget as WidgetConfig)
    }
  })
</script>
