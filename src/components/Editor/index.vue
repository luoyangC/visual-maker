<template>
  <div id="editor" class="editor">
    <vm-shape :key="rootWidgetObj.id" :widget-obj="rootWidgetObj" class="root-widget" />
    <!-- 右击菜单 -->
    <context-menu />
    <!-- 标线 -->
    <!-- <mark-line /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ContextMenu from './ContextMenu';
// import MarkLine from './MarkLine';
// import Shape from './Shape';
// import WidgetTemplate from './WidgetTemplate.vue';

export default {
  name: 'Editor',
  components: {
    ContextMenu,
    // MarkLine,
    // Shape,
    // WidgetTemplate,
  },
  computed: mapGetters(['rootWidgetObj']),
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  max-height: 800px;
  max-width: 1000px;
}
.root-widget {
  position: relative !important;
}
</style>
