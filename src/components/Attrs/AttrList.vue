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
        <vm-input v-model="curStyle.left" type="number" width="100" title="X" />
        <vm-input v-model="curStyle.top" type="number" width="100" title="Y" />
        <vm-input v-model="curStyle.rotate" type="number" width="100" icon="rote" />
      </div>
      <div class="attr-cell g-flex--bc mt-10">
        <vm-input v-model="curStyle.width" type="number" width="100" title="W" />
        <vm-input v-model="curStyle.height" type="number" width="100" title="H" />
        <div class="attr-position__lock g-flex--sc">
          <vm-icon class="attr-icon" :name="lockIcon" @click="handleSwitchLock" />
        </div>
      </div>
    </div>
    <el-divider class="attr-divider" />
    <!-- 显示和隐藏 -->
    <div class="attr-display">
      <div class="attr-cell g-flex--bc mt-10">
        <vm-slider v-model="curStyle.opacity" width="340" :convert="100" label="不透明度" />
      </div>
      <div class="attr-cell g-flex--bc mt-10">
        <vm-select
          v-model="curStyle.overflow"
          :items="OVERFLOW_TYPES"
          label="超出范围"
          width="340"
        />
      </div>
    </div>
    <el-divider class="attr-divider" />
    <!-- 内容文本 -->
    <div v-if="showText" class="attr-text">
      <vm-collapse title="文本">
        <div class="attr-text__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curStyle.fontSize" icon="font-size" type="number" width="100" />
            <vm-input v-model="curStyle.lineHeight" icon="height" type="number" width="100" />
            <div class="attr-color__picker g-flex--bc">
              <vm-color-picker v-model="curStyle.color" width="32" />
              <vm-icon name="switch" :disabled="curWidget.lock" @click="handleSwitchColor" />
              <vm-color-picker v-model="curStyle.backgroundColor" width="32" />
            </div>
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-select v-model="curStyle.fontFamily" :items="FONT_FAMILY_TYPES" width="114" />
            <el-divider direction="vertical" />
            <vm-button-group v-model="curStyle.textStyles" :items="TEXT_STYLE_TYPES" width="152" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-button-group v-model="curStyle.justifyContent" :items="ALIGN_TYPES" width="152" />
            <el-divider direction="vertical" />
            <vm-button-group v-model="curStyle.alignItems" :items="VERTICAL_TYPES" width="114" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showText" class="attr-divider" />
    <!-- 背景图片 -->
    <div v-if="showBackground" class="attr-background">
      <vm-collapse title="背景">
        <div class="attr-text__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curStyle.backgroundImage" label="背景图片" width="340" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curStyle.backgroundPosition" label="背景位置" width="340" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curStyle.backgroundSize" label="背景尺寸" width="340" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-select
              v-model="curStyle.backgroundRepeat"
              label="背景复制"
              :items="IMAGE_REPEAT_TYPES"
              width="340"
            />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showBackground" class="attr-divider" />
    <!-- 图表标题 -->
    <div v-if="showChartOption && curChart.title" class="attr-chart-option">
      <vm-collapse title="图表标题">
        <template #left>
          <el-switch v-model="curChart.title.show" size="small"></el-switch>
        </template>
        <div class="title-option__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curChart.title.text" label="标题文本" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showChartOption && curChart.title" class="attr-divider" />
    <!-- 图表图例 -->
    <div v-if="showChartOption && curChart.legend" class="attr-chart-option">
      <vm-collapse title="图表图例">
        <template #left>
          <el-switch v-model="curChart.legend.show" size="small"></el-switch>
        </template>
        <div class="legend-option__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curChart.legend.left" type="number" width="80" title="L" />
            <vm-input v-model="curChart.legend.top" type="number" width="80" title="T" />
            <vm-input v-model="curChart.legend.right" type="number" width="80" title="R" />
            <vm-input v-model="curChart.legend.bottom" type="number" width="80" title="B" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input-array v-model="curChart.legend.data" label="图例文本" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showChartOption && curChart.legend" class="attr-divider" />
    <!-- 图表提示 -->
    <div v-if="showChartOption && curChart.tooltip" class="attr-chart-option">
      <vm-collapse title="图表提示">
        <template #left>
          <el-switch v-model="curChart.tooltip.show" size="small"></el-switch>
        </template>
        <div class="tooltip-option__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curChart.tooltip.trigger" label="触发类型" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showChartOption && curChart.tooltip" class="attr-divider" />
    <!-- 图表X轴 -->
    <div v-if="showChartOption && curChart.xAxis" class="attr-chart-option">
      <vm-collapse title="图表X轴">
        <template #left>
          <el-switch v-model="curChart.xAxis.show" size="small"></el-switch>
        </template>
        <div class="xAxis-option__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curChart.xAxis.type" label="坐标类型" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curChart.xAxis.name" label="坐标名称" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showChartOption && curChart.xAxis" class="attr-divider" />
    <!-- 图表Y轴 -->
    <div v-if="showChartOption && curChart.yAxis" class="attr-chart-option">
      <vm-collapse title="图表Y轴">
        <template #left>
          <el-switch v-model="curChart.yAxis.show" size="small"></el-switch>
        </template>
        <div class="yAxis-option__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curChart.yAxis.type" label="坐标类型" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curChart.yAxis.name" label="坐标名称" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showChartOption && curChart.yAxis" class="attr-divider" />
    <!-- 图表配置 -->
    <div v-if="showChartOption" class="attr-chart-option">
      <vm-collapse v-model="showMoreChartOption" title="图表更多配置">
        <template #left>
          <el-switch v-model="showMoreChartOption" size="small"></el-switch>
        </template>
        <div class="more-option__body">
          <div class="mt-10">
            <vm-code-mirror v-model="chartOptionJson" :readonly="false" mode="application/json" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="showChartOption" class="attr-divider" />
    <!-- 其他属性 -->
    <div v-if="attrConfigs.length" class="attr-more">
      <vm-collapse title="更多属性">
        <vm-dynamic
          v-for="(item, index) in attrConfigs"
          :key="`${String(index)}.${String(item.model)}.${String(item.id)}`"
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
  import { computed, ref, watch } from 'vue'
  import { useStore } from '@/store'
  import {
    OVERFLOW_TYPES,
    FONT_FAMILY_TYPES,
    TEXT_STYLE_TYPES,
    ALIGN_TYPES,
    VERTICAL_TYPES,
    IMAGE_REPEAT_TYPES
  } from '@/constant/dict'
  import { isDef } from '@/utils'

  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])

  const curStyle = computed(() => curWidget.value.style)
  const attrConfigs = computed(() => curWidget.value.attrConfigs || [])
  const lockIcon = computed(() => (curWidget.value.lock ? 'lock' : 'unlock'))
  const showText = computed(() => curWidget.value.type !== 'chart')
  const showBackground = computed(
    () => curWidget.value.type !== 'chart' && isDef(curStyle.value.backgroundImage)
  )
  const showChartOption = computed(() => curWidget.value.type === 'chart')
  const curChart = computed(() => curWidget.value.subConfig)

  const handleSwitchColor = () => {
    const color = curWidget.value.style.color
    const bgColor = curWidget.value.style.backgroundColor
    curWidget.value.style.color = bgColor
    curWidget.value.style.backgroundColor = color
  }

  const handleSwitchLock = () => {
    curWidget.value.lock = !curWidget.value.lock
  }

  const getJsonData = () => {
    if (curWidget.value.type === 'chart' && curWidget.value.subConfig) {
      return JSON.stringify(curWidget.value.subConfig, null, 2)
    }
    return ''
  }

  const showMoreChartOption = ref(false)
  const chartOptionJson = ref(getJsonData())

  watch(
    () => curWidget.value,
    () => {
      if (getJsonData() !== chartOptionJson.value) {
        chartOptionJson.value = getJsonData()
      }
    },
    { deep: true }
  )

  watch(
    () => chartOptionJson.value,
    () => {
      try {
        curWidget.value.subConfig = JSON.parse(chartOptionJson.value)
      } catch (error) {
        // console.log(error)
      }
    }
  )
</script>

<style lang="scss" scoped>
  .attr-list {
    height: calc(100vh - 130px);
  }
  .attr-icon {
    width: 26px;
    height: 26px;
    padding: 5px;
  }
  .attr-divider {
    margin: 10px 0;
  }
  .attr-color__picker {
    width: 100px;
  }
  .attr-position__lock {
    width: 100px;
    padding-left: 4px;
  }
</style>
