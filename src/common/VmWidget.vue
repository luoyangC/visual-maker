<script>
import WidgetHook from '@/hooks/widget';

export default {
  name: 'VmWidget',
  props: {
    widget: {
      type: Object,
      default: null,
    },
  },
  render(h) {
    return WidgetHook.getWidget(this.widget.type).getTemplate(h, this.widget);
  },
};
</script>
