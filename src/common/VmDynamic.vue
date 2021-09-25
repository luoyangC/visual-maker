<script>
import DynamicHook from '@/hooks/dynamic';

export default {
  name: 'VmWidget',
  props: {
    config: {
      type: Object,
      default: null,
    },
    widget: {
      type: Object,
      default: null,
    },
    modelType: {
      type: String,
      default: 'props',
    },
  },
  render(h) {
    return DynamicHook.getDynamic(this.config.type).getTemplate(h, this.config, this.widget[this.modelType], this.widget);
  },
};
</script>
