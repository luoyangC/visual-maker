<template>
  <div class="head-avatar">
    <el-avatar :size="50" :src="avatar" @click="handleAvatar" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const week = ref(1)
  const avatar = ref('')

  const getWeekDate = () => {
    const now = new Date()
    const day = now.getDay()
    const weeks = [7, 1, 2, 3, 4, 5, 6]
    return weeks[day]
  }

  const initAvatar = () => {
    week.value = getWeekDate()
    avatar.value = `/visual-maker/thumb/avatar-${week.value}.png`
  }

  const handleAvatar = () => {
    if (week.value === 7) {
      week.value = 1
    } else {
      week.value++
    }
    avatar.value = `/visual-maker/thumb/avatar-${week.value}.png`
  }

  initAvatar()
</script>

<style lang="scss" scoped>
  .head-avatar {
    position: absolute;
    right: 10px;
    font-size: 0;
    ::v-deep(.el-avatar) {
      img {
        transition: 0.5s ease-in-out;
        &:hover {
          transform: scale(1.4) rotate(360deg);
        }
      }
    }
  }
</style>
