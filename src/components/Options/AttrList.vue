<template>
  <div class="attr-list">
    <div class="attr-layout">
      <vm-icon name="level-average-align" />
      <vm-icon name="vertical-average-align" />
      <vm-icon name="level-left-align" />
      <vm-icon name="level-center-align" />
      <vm-icon name="level-right-align" />
      <vm-icon name="vertical-top-align" />
      <vm-icon name="vertical-left-align" />
      <vm-icon name="vertical-bottom-align" />
    </div>
    <el-divider class="divider" />
    <div class="attr-position">
      <div class="attr-position__cell">
        <vm-input v-model="curWidgetObj.style.left" type="number" width="80" title="X" />
        <vm-input v-model="curWidgetObj.style.top" type="number" width="80" title="Y" />
        <vm-input v-model="curWidgetObj.style.rotate" type="number" width="80" icon="rote" />
      </div>
      <div class="attr-position__cell">
        <vm-input v-model="curWidgetObj.style.width" type="number" width="80" title="W" />
        <vm-input v-model="curWidgetObj.style.height" type="number" width="80" title="H" />
        <div class="attr-position__lock">
          <vm-icon v-if="lock" name="lock" size="16" />
          <vm-icon v-else name="unlock" size="16" />
        </div>
      </div>
    </div>
    <el-divider class="divider" />
    <div class="attr-visibility">
      <vm-slider v-model="curWidgetObj.style.opacity" :convert="100" label="不透明度" />
      <vm-select v-model="curWidgetObj.style.overflow" :items="$dict.OVERFLOW_TYPES" label="超出范围" class="mt10" />
    </div>
    <el-divider class="divider" />
    <div class="attr-text">
      <vm-collapse title="文本">
        <div class="attr-text__body">
          <div class="attr-text__cell">
            <vm-input v-model="curWidgetObj.style.fontSize" icon="font-size" type="number" width="80" />
            <vm-input v-model="curWidgetObj.style.lineHeight" icon="height" type="number" width="80" />
            <vm-color-picker v-model="curWidgetObj.style.color" width="35" />
            <vm-color-picker v-model="curWidgetObj.style.background" width="35" />
          </div>
          <div class="attr-text__cell">
            <vm-select v-model="curWidgetObj.style.fontFamily" :items="$dict.FONT_FAMILY_TYPES" :width="94" />
            <el-divider direction="vertical" />
            <vm-button-group :items="styleItems" width="125" />
          </div>
          <div class="attr-text__cell">
            <vm-button-group :items="textItems" width="125" />
            <el-divider direction="vertical" />
            <vm-button-group :items="positionItems" width="94" />
          </div>
        </div>
      </vm-collapse>
    </div>
    <el-divider class="divider" />
    <div v-if="curAttrConfigs.length" class="attr-more">
      <vm-collapse title="更多属性">
        <vm-dynamic
          v-for="(item, index) in curAttrConfigs"
          :key="index"
          :config="item"
          :widget="curWidgetObj"
          :model-type="'attrs'"
          class="mt-10"
        />
      </vm-collapse>
    </div>
  </div>
</template>

<script>
import VmCollapse from '@/common/VmCollapse.vue';
import { mapState } from 'vuex';

export default {
  name: 'AttrList',
  components: { VmCollapse },
  data() {
    return {
      lock: false,
      textItems: [
        {
          key: 1,
          icon: 'left-align',
          click: () => {
            this.curWidgetObj.style.textAlign = this.curWidgetObj.style.textAlign !== 'left' ? 'left' : '';
          },
          active: () => {
            return this.curWidgetObj.style.textAlign === 'left';
          },
        },
        {
          key: 2,
          icon: 'align-center',
          click: () => {
            this.curWidgetObj.style.textAlign = this.curWidgetObj.style.textAlign !== 'center' ? 'center' : '';
          },
          active: () => {
            return this.curWidgetObj.style.textAlign === 'center';
          },
        },
        {
          key: 3,
          icon: 'right-align',
          click: () => {
            this.curWidgetObj.style.textAlign = this.curWidgetObj.style.textAlign !== 'right' ? 'right' : '';
          },
          active: () => {
            return this.curWidgetObj.style.textAlign === 'right';
          },
        },
        {
          key: 4,
          icon: 'all-align',
          click: () => {
            this.curWidgetObj.style.textAlign = this.curWidgetObj.style.textAlign !== 'justify' ? 'justify' : '';
          },
          active: () => {
            return this.curWidgetObj.style.textAlign === 'justify';
          },
        },
      ],
      positionItems: [
        {
          key: 1,
          icon: 'top-align',
          click: () => {
            this.curWidgetObj.style.verticalAlign = this.curWidgetObj.style.verticalAlign !== 'top' ? 'top' : '';
          },
          active: () => {
            return this.curWidgetObj.style.verticalAlign === 'top';
          },
        },
        {
          key: 2,
          icon: 'vertical-center',
          click: () => {
            this.curWidgetObj.style.verticalAlign = this.curWidgetObj.style.verticalAlign !== 'middle' ? 'middle' : '';
          },
          active: () => {
            return this.curWidgetObj.style.verticalAlign === 'middle';
          },
        },
        {
          key: 3,
          icon: 'bottom-align',
          click: () => {
            this.curWidgetObj.style.verticalAlign = this.curWidgetObj.style.verticalAlign !== 'bottom' ? 'bottom' : '';
          },
          active: () => {
            return this.curWidgetObj.style.verticalAlign === 'bottom';
          },
        },
      ],
      styleItems: [
        {
          key: 1,
          icon: 'bold',
          click: () => {
            this.curWidgetObj.style.fontWeight = this.curWidgetObj.style.fontWeight === 500 ? 700 : 500;
          },
          active: () => {
            return this.curWidgetObj.style.fontWeight === 700;
          },
        },
        {
          key: 2,
          icon: 'italic',
          click: () => {
            this.curWidgetObj.style.fontStyle = this.curWidgetObj.style.fontStyle === 'normal' ? 'italic' : 'normal';
          },
          active: () => {
            return this.curWidgetObj.style.fontStyle === 'italic';
          },
        },
        {
          key: 3,
          icon: 'bottom-line',
          click: () => {
            this.curWidgetObj.style.textDecoration = this.curWidgetObj.style.textDecoration === 'underline' ? 'none' : 'underline';
          },
          active: () => {
            return this.curWidgetObj.style.textDecoration === 'underline';
          },
        },
        {
          key: 4,
          icon: 'delete-line',
          click: () => {
            this.curWidgetObj.style.textDecoration = this.curWidgetObj.style.textDecoration === 'line-through' ? 'none' : 'line-through';
          },
          active: () => {
            return this.curWidgetObj.style.textDecoration === 'line-through';
          },
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'curWidgetObj',
    ]),
    curAttrConfigs() {
      return this.curWidgetObj.attrConfigs || [];
    },
  },
};
</script>

<style lang="scss" scoped>
.attr-layout {
  display: flex;
  justify-content: space-around;
  .vm-icon {
    padding: 5px;
  }
}
.attr-position {
  &__cell {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 10px;
  }
  &__lock {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 26px;
    width: 80px;
    margin: 2px 0;
    padding-left: 4px;
  }
}
.attr-text {
  &__cell {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 10px;
  }
  ::v-deep.el-divider {
    height: 28px;
    margin: 2px 0;
  }
}
.divider {
  margin: 10px 0;
}
</style>
