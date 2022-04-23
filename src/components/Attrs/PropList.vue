<template>
  <vm-form class="prop-list" :disabled="curWidget.lock">
    <div v-if="hasStatic" class="prop-static">
      <vm-collapse v-model="showStatic" title="静态数据">
        <template #left>
          <el-switch v-model="showStatic" size="small"></el-switch>
        </template>
        <div class="more-option__body">
          <div class="mt-10">
            <vm-code-mirror v-model="dataset" :readonly="false" mode="application/json" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="hasStatic" class="prop-divider" />
    <div v-if="hasDynamic" class="prop-static">
      <vm-collapse v-model="showDynamic" title="动态数据">
        <template #left>
          <el-switch v-model="showDynamic" size="small"></el-switch>
        </template>
        <div v-if="curWidget.props" class="more-option__body">
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curWidget.props.dataApi" label="数据地址" />
          </div>
          <div class="attr-cell g-flex--bc mt-10">
            <vm-input v-model="curWidget.props.dataModel" label="数据模型" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider v-if="hasDynamic" class="prop-divider" />
    <div v-if="hasMoreProp" class="prop-more">
      <vm-collapse title="更多属性">
        <vm-dynamic
          v-for="(item, index) in propConfigs"
          :key="index"
          :config="item"
          :widget="curWidget"
          class="mt-10"
        />
      </vm-collapse>
    </div>
  </vm-form>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { computed } from 'vue'
  import { useDataset } from '@/commons/useDataset'
  import type { WidgetConfig } from '@/models/widget'

  const widgetStore = useWidgetStore()

  const curWidget = computed<WidgetConfig>(() => widgetStore.current)
  const propConfigs = computed(() => curWidget.value.propConfigs)
  const hasMoreProp = computed(() => curWidget.value.propConfigs?.length)

  const { hasStatic, showStatic, hasDynamic, showDynamic, dataset } = useDataset(curWidget)
</script>

<style lang="scss" scoped>
  .prop-list {
    height: calc(100vh - 154px);
  }
  .prop-divider {
    margin: 10px 0;
  }
</style>
