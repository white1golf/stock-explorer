<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    //위로가기 기능.
    scrollTo(hash) {
      location.href = hash;
    },
  },

  mounted() {
    //해쉬로 가기?
    if (this.$route.hash) {
      this.$nextTick(() => this.scrollTo(this.$route.hash));
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
