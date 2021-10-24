<template>
  <div v-show="show" class="contextmenu" :style="{ top: top + 'px', left: left + 'px' }">
    <ul>
      <li @click="delWidgetObj">删除</li>
      <li @click="setWidgetLock">锁定</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from '@/store'
  const store = useStore()

  const top = computed(() => store.getters['menu/top'])
  const left = computed(() => store.getters['menu/left'])
  const show = computed(() => store.getters['menu/show'])

  const delWidgetObj = () => {
    store.dispatch('widget/delete')
    store.dispatch('menu/hidden')
  }

  const setWidgetLock = () => {
    store.dispatch('widget/lock')
    store.dispatch('menu/hidden')
  }
</script>

<style lang="scss" scoped>
  .contextmenu {
    z-index: 1000;
    position: fixed;
    ul {
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      margin: 5px 0;
      padding: 5px 0;
      li {
        font-size: 14px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        cursor: pointer;
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
</style>
