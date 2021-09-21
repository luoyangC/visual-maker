<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-select v-model="innerData" class="vm-select" size="small" placeholder="请选择">
      <el-option
        v-for="item in items"
        :key="item[dictKey]"
        class="vm-select-item"
        :value="item[dictKey]"
        :label="item[dictName]"
      />
    </el-select>
  </vm-form-item>
</template>

<script>
import formMixin from './formMixin';

export default {
  name: 'VmSelect',
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
    items: {
      type: Array,
      default: () => [],
    },
    dictKey: {
      type: String,
      default: 'value',
    },
    dictName: {
      type: String,
      default: 'label',
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
