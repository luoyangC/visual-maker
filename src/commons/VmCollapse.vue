<template>
  <div class="vm-collapse">
    <div class="vm-collapse__head" @click="handleHead">
      <span class="vm-collapse__title">{{ title }}</span>
      <i v-if="active" class="vm-collapse__arrow el-icon-arrow-right is-active" />
      <i v-else class="vm-collapse__arrow el-icon-arrow-right" />
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
      font-size: 12px;
      font-weight: 600;
    }
    &__title {
      padding-left: 2px;
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
