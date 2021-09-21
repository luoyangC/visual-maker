<template>
  <div class="vm-form-item" :style="[innerWidth]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VmFormItem',
  props: {
    width: {
      type: [Number, String],
      default: 260,
    },
  },
  computed: {
    innerWidth() {
      return { width: `${this.width}px` };
    },
  },
};
</script>

<style lang="scss" scoped>
.vm-form-item {
  display: flex;
  align-items: center;
  height: 32px;
}
</style>
