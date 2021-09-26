<template>
  <el-container>
    <el-header class="vm-header">
      <vm-icon name="undo" text="撤销" i-class="header-item" />
      <vm-icon name="redo" text="重做" i-class="header-item" />
      <vm-icon name="delete" text="清空" i-class="header-item" />
      <vm-icon name="save" text="保存" i-class="header-item" />
      <vm-icon name="preview" text="预览" i-class="header-item" />
    </el-header>
    <el-main class="vm-main">
      <div class="vm-aside">
        <vm-icon name="widget" title="组件" size="24" i-class="aside-item" @click="checkOption(1)" />
        <vm-icon name="pillar" title="图表" size="24" i-class="aside-item" @click="checkOption(2)" />
        <vm-icon name="custom" title="工具" size="24" i-class="aside-item" @click="checkOption(3)" />
        <vm-icon name="application" title="扩展" size="24" i-class="aside-item" @click="checkOption(4)" />
        <vm-icon name="tree" title="结构" size="24" i-class="aside-item" @click="checkOption(5)" />
      </div>
      <div class="vm-option">
        <widget-list v-if="option === 1" />
        <chart-list v-if="option === 2" />
        <tool-list v-if="option === 3" />
        <extend-list v-if="option === 4" />
        <structure-list v-if="option === 5" />
      </div>
      <div class="vm-canvas">
        <editor />
      </div>
      <div class="vm-attribute">
        <el-tabs v-model="attrActiveName" stretch>
          <el-tab-pane label="外观" name="attr">
            <attr-list />
          </el-tab-pane>
          <el-tab-pane label="属性" name="prop">
            <prop-list />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
    <!-- <el-footer /> -->
  </el-container>
</template>

<script>
import ChartList from './Options/ChartList.vue';
import WidgetList from './Options/WidgetList.vue';
import ToolList from './Options/ToolList.vue';
import ExtendList from './Options/ExtendList.vue';
import StructureList from './Options/StructureList.vue';
import AttrList from './Options/AttrList.vue';
import PropList from './Options/PropList.vue';
import Editor from './Editor/index.vue';

export default {
  name: 'VisualMaker',
  components: {
    WidgetList,
    ChartList,
    ToolList,
    ExtendList,
    StructureList,
    Editor,
    AttrList,
    PropList,
  },
  data() {
    return {
      option: 1,
      attrActiveName: 'attr',
    };
  },
  methods: {
    checkOption(option) {
      this.option = option;
    },
    undo() {},
    redo() {},
    preview() {},
    save() {},
    clearCanvas() {},
  },
};
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
  width: 280px;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  ::v-deep.el-tabs__header {
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
