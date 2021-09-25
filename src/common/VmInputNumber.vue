<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-input-number v-model="innerData" size="small" />
  </vm-form-item>
</template>

<script>
import formMixin from './formMixin';

export default {
  name: 'VmInputNumber',
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
  },
  data() {
    return {
      innerData: '',
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

<style lang="scss" scoped>
.el-input-number--small {
  width: 180px;
}
</style>
