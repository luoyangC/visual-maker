<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-color-picker v-model="innerData" :show-alpha="showAlpha" :predefine="predefine" size="mini" />
  </vm-form-item>
</template>

<script>
import formMixin from './formMixin';

export default {
  name: 'VmColorPicker',
  mixins: [formMixin],
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: [String, Number],
      require: true,
    },
    showAlpha: {
      type: Boolean,
      default: true,
    },
    predefine: {
      type: Array,
      default: () => ([
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
      ]),
    },
  },
  data() {
    return {
      innerData: 100,
    };
  },
  watch: {
    value(nv) {
      this.innerData = nv;
    },
    innerData(nv) {
      this.$emit('input', nv);
    },
  },
  created() {
    this.innerData = this.value;
  },
};
</script>
