<template>
  <div :class="['vm-icon', iClass]" @click="$emit('click')">
    <div class="vm-icon_inner">
      <el-tooltip
        class="vm-icon_tip"
        effect="dark"
        placement="left"
        :content="title"
        :disabled="showTip"
      >
        <svg class="vm-icon_svg" aria-hidden="true" :style="realSize">
          <use :xlink:href="realName" />
        </svg>
      </el-tooltip>
    </div>
    <span v-if="showText" class="vm-icon_text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'VmIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 18,
    },
    iClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    realName() {
      return `#icon-${this.name}`;
    },
    realSize() {
      return `font-size: ${this.size}px`;
    },
    showTip() {
      return !this.title;
    },
    showText() {
      return Boolean(this.text);
    },
  },
};
</script>

<style lang="scss">
.vm-icon {
  text-align: center;
  border-radius: 4px;
  transition: all 0.2s ease-out 0s;
  color: #7d7d7d;
  &:hover {
    background-color: #e1e4e7;
  }
  &_svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    vertical-align: top;
  }
  &_text {
    display: inline-block;
    vertical-align: -0.15em;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
