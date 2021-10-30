<template>
  <vm-form class="attr-list" :disabled="curWidget.lock">
    <!-- 排列布局 -->
    <div class="attr-layout g-flex--ac">
      <vm-icon name="level-average-align" class="attr-icon" />
      <vm-icon name="vertical-average-align" class="attr-icon" />
      <vm-icon name="level-left-align" class="attr-icon" />
      <vm-icon name="level-center-align" class="attr-icon" />
      <vm-icon name="level-right-align" class="attr-icon" />
      <vm-icon name="vertical-top-align" class="attr-icon" />
      <vm-icon name="vertical-left-align" class="attr-icon" />
      <vm-icon name="vertical-bottom-align" class="attr-icon" />
    </div>
    <el-divider class="attr-divider" />
    <!-- 位置和长宽 -->
    <div class="attr-position">
      <div class="attr-cell g-flex--bc mt-10">
        <vm-input v-model="curStyle.left" type="number" width="80" title="X" />
        <vm-input v-model="curStyle.top" type="number" width="80" title="Y" />
        <vm-input v-model="curStyle.rotate" type="number" width="80" icon="rote" />
      </div>
      <div class="attr-cell g-flex--bc mt-10">
        <vm-input v-model="curStyle.width" type="number" width="80" title="W" />
        <vm-input v-model="curStyle.height" type="number" width="80" title="H" />
        <div class="attr-position__lock g-flex--sc">
          <vm-icon class="attr-icon" :name="lockIcon" @click="handleSwitchLock" />
        </div>
      </div>
    </div>
    <el-divider class="attr-divider" />
    <!-- 显示和隐藏 -->
    <div class="attr-display">
      <div class="attr-cell g-flex--bc mt-10">
        <vm-slider v-model="curStyle.opacity" :convert="100" label="不透明度" />
      </div>
      <div class="attr-cell g-flex--bc mt-10">
        <vm-select v-model="curStyle.overflow" :items="OVERFLOW_TYPES" label="超出范围" />
      </div>
    </div>
    <el-divider class="attr-divider" />
    <!-- 内容文本 -->
    <div class="attr-text">
      <vm-collapse title="文本">
        <div class="attr-text__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curStyle.fontSize" icon="font-size" type="number" width="80" />
            <vm-input v-model="curStyle.lineHeight" icon="height" type="number" width="80" />
            <div class="attr-color__picker g-flex--bc">
              <vm-color-picker v-model="curStyle.color" width="28" />
              <vm-icon name="switch" :disabled="curWidget.lock" @click="handleSwitchColor" />
              <vm-color-picker v-model="curStyle.backgroundColor" width="28" />
            </div>
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-select v-model="curStyle.fontFamily" :items="FONT_FAMILY_TYPES" width="94" />
            <el-divider direction="vertical" />
            <vm-button-group v-model="curStyle.textStyles" :items="TEXT_STYLE_TYPES" width="125" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-button-group v-model="curStyle.textAlign" :items="ALIGN_TYPES" width="125" />
            <el-divider direction="vertical" />
            <vm-button-group v-model="curStyle.verticalAlign" :items="VERTICAL_TYPES" width="94" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider class="attr-divider" />
    <!-- 其他属性 -->
    <div v-if="attrConfigs.length" class="attr-more">
      <vm-collapse title="更多属性">
        <vm-dynamic
          v-for="(item, index) in attrConfigs"
          :key="index + item.model + item.id"
          :config="item"
          :widget="curWidget"
          :model-type="'attrs'"
          class="mt-10"
        />
      </vm-collapse>
    </div>
  </vm-form>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from '@/store'
  import {
    OVERFLOW_TYPES,
    FONT_FAMILY_TYPES,
    TEXT_STYLE_TYPES,
    ALIGN_TYPES,
    VERTICAL_TYPES
  } from '@/constant/dict'

  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])

  const curStyle = computed(() => curWidget.value.style)
  const attrConfigs = computed(() => curWidget.value.attrConfigs || [])
  const lockIcon = computed(() => (curWidget.value.lock ? 'lock' : 'unlock'))

  const handleSwitchColor = () => {
    const color = curWidget.value.style.color
    const bgColor = curWidget.value.style.backgroundColor
    curWidget.value.style.color = bgColor
    curWidget.value.style.backgroundColor = color
  }

  const handleSwitchLock = () => {
    curWidget.value.lock = !curWidget.value.lock
  }
</script>

<style lang="scss" scoped>
  .attr-icon {
    width: 26px;
    height: 26px;
    padding: 5px;
  }
  .attr-divider {
    margin: 10px 0;
  }
  .attr-color__picker {
    width: 80px;
  }
  .attr-position__lock {
    width: 80px;
    padding-left: 4px;
  }
</style>
