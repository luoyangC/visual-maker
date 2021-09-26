<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <div
      ref="VmInput"
      :class="{ 'vm-input': true, 'vm-input--border': border, 'is-disabled': isDisabled }"
      @mouseenter="onHover"
      @mouseleave="onHover"
    >
      <div v-if="showPrefix" class="vm-input__prefix">
        <span>{{ title }}</span>
        <svg class="vm-icon_svg" aria-hidden="true" style="font-size: 16px">
          <use :xlink:href="iconName" />
        </svg>
      </div>
      <input
        class="vm-input__inner"
        type="text"
        :value="value"
        :disabled="isDisabled"
        @input="handleInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div v-if="showAction" v-show="hover" class="vm-input__action">
        <span role="button" class="vm-input__increase" @click="handlePlus">
          <i class="el-icon-caret-top" />
        </span>
        <span role="button" class="vm-input__decrease" @click="handleMinus">
          <i class="el-icon-caret-bottom" />
        </span>
      </div>
    </div>
  </vm-form-item>
</template>

<script>
import formMixin from './formMixin';

export default {
  name: 'VmInput',
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
    type: {
      type: String,
      default: 'string',
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hover: false,
      innerData: '',
    };
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    showPrefix() {
      return this.title || this.icon;
    },
    showAction() {
      return this.type === 'number';
    },
    isDisabled() {
      if (this.disabled === undefined) {
        return this.value === undefined;
      }
      return this.disabled;
    },
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
  methods: {
    onFocus() {
      const style = this.$refs.VmInput.getAttribute('class');
      this.$refs.VmInput.setAttribute('class', `${style} vm-input--active`);
    },
    onBlur() {
      const style = this.$refs.VmInput.getAttribute('class');
      this.$refs.VmInput.setAttribute('class', style.replace(' vm-input--active', ''));
    },
    onHover() {
      if (this.isDisabled) return;
      this.hover = !this.hover;
    },
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
    handlePlus() {
      this.innerData++;
    },
    handleMinus() {
      this.innerData--;
    },
  },
};
</script>

<style lang="scss" scoped>
.vm-input {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  height: 30px;
  font-size: 14px;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: border 0.2s ease-out 0s, outline 0s ease 0s, opacity 0s ease 0s;
  &:hover {
    border: 1px solid rgb(235, 235, 235);
  }
  &--border {
    border: 1px solid rgb(235, 235, 235);
  }
  &--active {
    border: 1px solid rgb(22, 132, 252);
    outline: rgb(22, 132, 252) solid 1px;
    outline-offset: -2px;
  }
  &__prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 2px 0px 4px;
    width: 20px;
    height: 100%;
    user-select: none;
    color: rgb(141, 158, 167);
  }
  &__inner {
    color: rgb(31, 41, 46);
    width: 100%;
    height: 100%;
    margin-left: 5px;
    transition: all 0.2s ease-out 0s;
    cursor: default;
    user-select: text;
    background: none;
    border: 0;
    outline: 0;
  }
  &__action {
    position: relative;
    display: block;
    margin: 0px;
    padding: 0px 4px 0px 2px;
    width: 20px;
    line-height: 0;
  }
  &__increase {
    &:hover {
      color: rgb(22, 132, 252);
    }
    right: 0;
    top: 0;
    color: rgb(141, 158, 167);
    transition: all 0.1s ease-out 0s;
  }
  &__decrease {
    &:hover {
      color: rgb(22, 132, 252);
    }
    right: 0;
    bottom: 0;
    color: rgb(141, 158, 167);
    transition: all 0.1s ease-out 0s;
  }
}

.is-disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  .vm-input__inner {
    cursor: not-allowed;
  }
}
</style>
