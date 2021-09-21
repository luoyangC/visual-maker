<template>
  <div id="app">
    <VisualMaker />
  </div>
</template>

<script>
import VisualMaker from './components/VisualMaker.vue';

export default {
  name: 'App',
  components: {
    VisualMaker,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.mt10 {
  margin-top: 10px;
}
.mr10 {
  margin-right: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
.ml10 {
  margin-left: 10px;
}
</style>
