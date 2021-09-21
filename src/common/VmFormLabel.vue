<template>
  <div v-if="label" class="vm-label">{{ label }}</div>
</template>

<script>
export default {
  name: 'VmFormLabel',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.vm-label {
  display: inline-block;
  width: 80px;
  font-size: 14px;
  flex-shrink: 0;
}
</style>
