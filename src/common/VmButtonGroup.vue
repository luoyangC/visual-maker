<template>
  <vm-form-item :width="width">
    <vm-form-label :label="label" />
    <div class="vm-button-group">
      <div
        v-for="item in items"
        :key="item.key"
        :class="{ 'vm-button-item': true, 'vm-button-item--active': checkActive(item) }"
        @click="handleClick(item)"
      >
        <vm-icon :name="item.icon" />
      </div>
    </div>
  </vm-form-item>
</template>

<script>
import formMixin from './formMixin';

export default {
  name: 'VmButtonGroup',
  mixins: [formMixin],
  props: {
    items: {
      type: Array,
      require: true,
    },
  },
  methods: {
    checkActive(ctx) {
      return ctx.active && ctx.active();
    },
    handleClick(ctx) {
      ctx.click && ctx.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.vm-button {
  &-group {
    display: flex;
  }
  &-item {
    padding: 6px;
    border: 1px solid #dcdfe6;
    border-left: 0;
    cursor: pointer;
    &--active {
      background-color: #ebeef5;
    }
    &:hover {
      background-color: #e1e4e7;
    }
    &:first-child {
      border-left: 1px solid #dcdfe6;
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
    ::v-deep.vm-icon:hover {
      color: #409eff;
      background-color: transparent;
    }
  }
}
</style>
