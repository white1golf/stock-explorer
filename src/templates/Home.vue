<template>
  <div class="home">
    <TheNavbar />

    <section class="container">
      <Scrollindicator />
      <Contentcontainer />
    </section>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar';
import Contentcontainer from '@/components/Contentcontainer';
import Scrollindicator from '@/components/Scrollindicator';

export default {
  name: 'App',

  data() {
    return {};
  },

  methods: {
    scrollTo(hash) {
      location.href = hash;
    },
  },
  components: {
    TheNavbar,
    Contentcontainer,
    Scrollindicator,
  },

  mounted() {},
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
