<template>
  <div class="vm-collapse">
    <div class="vm-collapse__head" @click="handleHead">
      <div>
        <div class="vm-collapse__head-left" @click.stop>
          <slot name="left" />
        </div>
        <span class="vm-collapse__title">{{ title }}</span>
      </div>
      <i v-if="active" class="vm-collapse__arrow iconfont icon-arrow-right is-active" />
      <i v-else class="vm-collapse__arrow iconfont icon-arrow-right" />
    </div>
    <div v-if="active" class="vm-collapse__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineProps<{ title: string }>()

  const active = ref(true)

  const handleHead = () => {
    active.value = !active.value
  }
</script>

<style lang="scss" scoped>
  .vm-collapse {
    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 600;
      height: 24px;
      &-left {
        display: inline-block;
      }
    }
    &__title {
      padding-left: 6px;
    }
    &__arrow {
      transition: transform 0.3s;
      font-weight: 300;
    }
    &__arrow.is-active {
      transform: rotate(90deg);
    }
  }
</style>
