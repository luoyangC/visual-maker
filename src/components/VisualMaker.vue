<template>
  <el-container>
    <el-header class="vm-header">
      <vm-icon name="undo" text="撤销" class="header-item" />
      <vm-icon name="redo" text="重做" class="header-item" />
      <vm-icon name="delete" text="清空" class="header-item" @click="clear" />
      <vm-icon name="save" text="保存" class="header-item" @click="save" />
      <vm-icon name="preview" text="预览" class="header-item" @click="preview" />
      <head-export />
      <head-avatar />
    </el-header>
    <el-main class="vm-main">
      <div class="vm-aside">
        <vm-icon name="widget" tip="组件" size="24" class="aside-item" @click="checkOption('1')" />
        <vm-icon name="pillar" tip="图表" size="24" class="aside-item" @click="checkOption('2')" />
        <vm-icon name="custom" tip="工具" size="24" class="aside-item" @click="checkOption('3')" />
        <vm-icon name="app" tip="扩展" size="24" class="aside-item" @click="checkOption('4')" />
        <vm-icon name="tree" tip="结构" size="24" class="aside-item" @click="checkOption('5')" />
        <vm-icon name="github" tip="源码" size="24" class="aside-item bottom" @click="toGitHub" />
      </div>
      <div class="vm-option">
        <widget-list v-if="option === '1'" />
        <chart-list v-if="option === '2'" />
        <tool-list v-if="option === '3'" />
        <extend-list v-if="option === '4'" />
        <structure-list v-if="option === '5'" />
      </div>
      <div class="vm-canvas">
        <editor />
      </div>
      <div class="vm-attribute">
        <el-tabs v-model="active" stretch>
          <el-tab-pane label="外观" name="attr" lazy>
            <el-scrollbar always>
              <attr-list />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane v-if="curWidget.propConfigs?.length" label="属性" name="prop" lazy>
            <prop-list />
          </el-tab-pane>
          <el-tab-pane v-if="curWidget.type === 'chart'" label="数据集" name="data" lazy>
            <data-list />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="vm-preview">
        <Preview v-model="showPreview" />
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import { useStore } from '@/store'
  import { ref, computed, watch } from 'vue'
  import WidgetList from './Options/WidgetList.vue'
  import ChartList from './Options/ChartList.vue'
  import ExtendList from './Options/ExtendList.vue'
  import ToolList from './Options/ToolList.vue'
  import StructureList from './Options/StructureList.vue'
  import Editor from './Editor/index.vue'
  import AttrList from './Attrs/AttrList.vue'
  import PropList from './Attrs/PropList.vue'
  import DataList from './Attrs/DataList.vue'
  import Preview from './Preview/index.vue'
  import HeadExport from './Action/HeadExport.vue'
  import HeadAvatar from './Action/HeadAvatar.vue'

  const option = ref('1')
  const active = ref('attr')
  const showPreview = ref(false)

  const checkOption = (val: string) => {
    option.value = val
  }

  const toGitHub = () => {
    window.open('https://github.com/luoyangC/visual-maker')
  }

  // const undo = () => {}
  // const redo = () => {}
  const preview = () => {
    showPreview.value = true
  }
  const save = () => {}
  const clear = () => {}

  const store = useStore()

  const curWidget = computed(() => store.getters['widget/current'])

  watch(curWidget, () => {
    active.value = 'attr'
  })
</script>

<style lang="scss" scoped>
  .vm-header {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }
  .vm-main {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f5;
    height: calc(100vh - 60px);
    padding: 0;
  }
  .vm-canvas {
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 10px;
  }
  .vm-aside {
    z-index: 30;
    z-index: 1;
    width: 55px;
    padding: 10px;
    background-color: #ffffff;
    border-right: 1px solid #e6e6e6;
  }
  .vm-option {
    z-index: 40;
    width: 250px;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  }
  .vm-attribute {
    z-index: 50;
    width: 360px;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
    ::v-deep(.el-tabs__header) {
      margin-bottom: 10px;
    }
  }

  .header-item {
    height: 50px;
    width: 50px;
    padding: 5px;
    margin-right: 8px;
    border-radius: 4px;
  }

  .aside-item {
    height: 35px;
    width: 35px;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .aside-item.bottom {
    position: absolute;
    bottom: 10px;
  }
</style>
