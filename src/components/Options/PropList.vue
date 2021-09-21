<template>
  <div class="prop-list">
    <div class="prop-conponent">
      <vm-dynamic
        v-for="(item, index) in propConfigs"
        :key="index"
        :config="item"
        :widget="curWidgetObj"
        class="mt-10"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PropList',
  computed: {
    ...mapState(['curWidgetObj']),
    propConfigs() {
      return this.curWidgetObj.propConfigs || [];
    },
  },
};
</script>
