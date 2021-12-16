<template>
  <el-container>
    <el-header class="vm-header">
      <vm-icon name="undo" text="撤销" class="header-item" />
      <vm-icon name="redo" text="重做" class="header-item" />
      <vm-icon name="delete" text="清空" class="header-item" />
      <vm-icon name="save" text="保存" class="header-item" />
      <vm-icon name="preview" text="预览" class="header-item" @click="preview" />
      <vm-export />
    </el-header>
    <el-main class="vm-main">
      <div class="vm-aside" @click.stop="checkOption">
        <vm-icon data-option="1" name="widget" tip="组件" size="24" class="aside-item" />
        <vm-icon data-option="2" name="pillar" tip="图表" size="24" class="aside-item" />
        <vm-icon data-option="3" name="custom" tip="工具" size="24" class="aside-item" />
        <vm-icon data-option="4" name="application" tip="扩展" size="24" class="aside-item" />
        <vm-icon data-option="5" name="tree" tip="结构" size="24" class="aside-item" />
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
          <el-tab-pane label="外观" name="attr">
            <attr-list />
          </el-tab-pane>
          <el-tab-pane label="属性" name="prop">
            <prop-list />
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
  import { ref } from 'vue'
  import WidgetList from './Options/WidgetList.vue'
  import ChartList from './Options/ChartList.vue'
  import ExtendList from './Options/ExtendList.vue'
  import ToolList from './Options/ToolList.vue'
  import StructureList from './Options/StructureList.vue'
  import Editor from './Editor/index.vue'
  import AttrList from './Attrs/AttrList.vue'
  import PropList from './Attrs/PropList.vue'
  import Preview from './Preview/index.vue'
  import VmExport from './Action/VmExport.vue'

  const option = ref('1')
  const active = ref('attr')
  const showPreview = ref(false)

  const getItemNode = (node: any): any => {
    if (node.classList.value.includes('aside-item')) {
      return node
    } else {
      return getItemNode(node.parentNode)
    }
  }
  const checkOption = (e: Event) => {
    const node = getItemNode(e.target)
    option.value = node.dataset.option
  }

  // const undo = () => {}
  // const redo = () => {}
  const preview = () => {
    showPreview.value = true
  }
  // const save = () => {}
  // const clearCanvas = () => {}
</script>

<style lang="scss" scoped>
  .vm-header {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }
  .vm-main {
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f5;
    height: calc(100vh - 60px);
    padding: 0;
  }
  .vm-aside {
    z-index: 1;
    width: 55px;
    padding: 10px;
    background-color: #ffffff;
    border-right: 1px solid #e6e6e6;
  }
  .vm-option {
    width: 250px;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  }
  .vm-canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 10px;
  }
  .vm-attribute {
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
</style>
