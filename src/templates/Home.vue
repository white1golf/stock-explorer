<template>
  <div class="home">
    <TheNavbar2 />
    <div class="container-v">
      <Hello></Hello>
    </div>
  </div>
</template>

<script>
import TheNavbar2 from '@/components/TheNavbar2';
import Hello from '@/components/Hello';
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
    Hello,
  },
};
</script>
