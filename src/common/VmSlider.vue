<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <el-slider v-model="innerData" class="vm-slider" :show-tooltip="false" />
    <vm-input v-model="innerData" width="58" type="number" class="ml-20" />
  </vm-form-item>
</template>

<script>
import formMixin from './formMixin';

export default {
  name: 'VmSlider',
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
    convert: {
      type: [Number],
      default: 1,
    },
  },
  data() {
    return {
      innerData: 100,
    };
  },
  watch: {
    value(nv) {
      this.innerData = nv * this.convert;
    },
    innerData(nv) {
      this.$emit('input', nv / this.convert);
    },
  },
  created() {
    this.innerData = this.value * this.convert;
  },
};
</script>

<style lang="scss" scoped>
.vm-slider {
  flex-grow: 1;
  margin: 0;
  ::v-deep.el-slider {
    height: 28px;
    &__runway {
      height: 3px;
      margin: 12.5px 0;
    }
    &__button-wrapper {
      width: 28px;
      height: 28px;
      top: -13px;
    }
    &__button {
      width: 8px;
      height: 8px;
    }
    &__bar {
      height: 3px;
    }
  }
}
</style>
