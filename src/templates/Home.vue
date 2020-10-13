<template>
  <div class="home">
    <TheNavbar2 />
    <div class="container">
      <Scrollindicator />
      <Contentcontainer />
    </div>
  </div>
</template>

<script>
import TheNavbar2 from '@/components/TheNavbar2';
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
    TheNavbar2,
    Contentcontainer,
    Scrollindicator,
  },
};
</script>
