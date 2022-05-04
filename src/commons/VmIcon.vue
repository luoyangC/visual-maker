<template>
  <div :class="{ 'vm-icon': true, 'vm-icon--disabled': isDisabled }">
    <div class="vm-icon_inner">
      <el-tooltip
        effect="dark"
        placement="right"
        :content="tip"
        :disabled="hasTip"
        :append-to-body="false"
      >
        <div>
          <svg class="vm-icon_svg" aria-hidden="true" :style="realSize">
            <use :xlink:href="realName" />
          </svg>
        </div>
      </el-tooltip>
    </div>
    <span v-if="hasText" class="vm-icon_text">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    name: string
    text?: string
    tip?: string
    size?: number | string
    disabled?: boolean
  }>()

  const realName = computed(() => `#icon-${props.name}`)
  const realSize = computed(() => `font-size: ${props.size || 16}px`)
  const hasTip = computed(() => !props.tip)
  const hasText = computed(() => Boolean(props.text))
  const isDisabled = computed(() => props.disabled)
</script>

<style lang="scss">
  .vm-icon {
    text-align: center;
    border-radius: 4px;
    transition: all 0.2s ease-out 0s;
    color: #7d7d7d;
    height: 16px;
    width: 16px;
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
    &--disabled {
      cursor: not-allowed;
      background-image: none;
      background-color: var(--el-disabled-bg-color);
      border-color: var(--el-disabled-border-color);
      color: var(--el-disabled-text-color);
      &:hover {
        background-color: var(--el-disabled-bg-color) !important;
      }
    }
  }
</style>
