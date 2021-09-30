import Vue from 'vue';
import Vuex from 'vuex';
import widgetHook from '@/hooks/widget';
import { isBoolean, clone, generateID } from '@/utils/index';
// import toast from '@/utils/toast';

Vue.use(Vuex);

const rootWidgetObj = clone(widgetHook.getObject('root'));
rootWidgetObj.id = generateID();

const store = new Vuex.Store({
  getters: {
    rootWidgetObj: state => state.rootWidgetObj,
    curWidgetObj: state => state.curWidgetObj,
    curDeletable: state => isBoolean(state.curWidgetObj.deletable) ? state.curWidgetObj.deletable : true,

    menuTop: state => state.menuTop,
    menuLeft: state => state.menuLeft,
    menuShow: state => state.menuShow,
  },
  state: {
    rootWidgetObj: rootWidgetObj,
    curWidgetObj: rootWidgetObj,
    curWidgetObjZIndex: 0,

    snapshotData: [], // 编辑器快照数据
    snapshotIndex: -1, // 快照索引

    menuTop: 0,
    menuLeft: 0,
    menuShow: false,
  },
  mutations: {

    addWidgetObj(state, { widgetObj, parentWidgetObj }) {
      parentWidgetObj.children.push(widgetObj);
    },

    setCurWidgetObj(state, { widgetObj, zIndex }) {
      state.curWidgetObj = widgetObj;
      state.curWidgetObjZIndex = zIndex;
    },

    delWidgetObj(state) {
      state.curWidgetObj.parent.children.splice(state.curWidgetObjZIndex, 1);
      state.menuShow = false;
    },

    setShapeStyle({ curWidgetObj }, { top, left, width, height }) {
      if (top) curWidgetObj.style.top = top;
      if (left) curWidgetObj.style.left = left;
      if (width) curWidgetObj.style.width = width;
      if (height) curWidgetObj.style.height = height;
    },

    setShapePosStyle({ curWidgetObj }, { key, value }) {
      curWidgetObj.style[key] = value;
    },

    undo(state) {
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--;
        store.commit('setRootWidgetObj', clone(state.snapshotData[state.snapshotIndex]));
      }
    },

    redo(state) {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
        store.commit('setRootWidgetObj', clone(state.snapshotData[state.snapshotIndex]));
      }
    },

    setRootWidgetObj(state, rootWidgetObj) {
      Vue.set(state, 'rootWidgetObj', rootWidgetObj);
    },

    recordSnapshot(state) {
      // 添加新的快照
      state.snapshotData[++state.snapshotIndex] = clone(state.rootWidgetObj);
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1);
      }
    },

    showContexeMenu(state, { top, left, widgetObj }) {
      if (widgetObj !== state.rootWidgetObj) {
        state.menuShow = true;
        state.menuTop = top;
        state.menuLeft = left;
      }
    },

    hideContexeMenu(state) {
      state.menuShow = false;
    },

    upComponent({ rootWidgetObj, curWidgetObjZIndex }) {
      // 上移图层 zIndex，表示元素在数组中越往后
    },

    downComponent({ rootWidgetObj, curWidgetObjZIndex }) {
      // 下移图层 zIndex，表示元素在数组中越往前
    },

    topComponent({ rootWidgetObj, curWidgetObjZIndex }) {
      // 置顶
    },

    bottomComponent({ rootWidgetObj, curWidgetObjZIndex }) {
      // 置底
    },

  },
});

export default store;
