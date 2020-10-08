<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from '@/templates/Home';

export default {
  name: 'App',

  components: {
    Home,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
