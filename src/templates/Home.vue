<template>
  <div class="home">
    <TheNavbar2 />
    <div
      class="flex flex-col h-full w-11/12 max-w-4xl mx-auto items-center bg-white"
    >
      <div class="flex flex-col my-40 md:flex-row" v-if="!isAuthenticated">
        <HomeCTA class="max-w-sm md:w-1/2" />
        <SvgImage
          class="py-10 order-first md:px-3 md:order-2 md:w-auto"
          name="login"
        />
      </div>
      <EditorWrapper v-else />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar2 from '@/components/TheNavbar2';
import EditorWrapper from '@/components/Editor/EditorWrapper';
import HomeCTA from '@/components/HomeCTA';
import SvgImage from '@/components/SvgImage';
import TheFooter from '@/components/TheFooter';
export default {
  name: 'App',

  data() {
    return {};
  },

  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    scrollTo(hash) {
      location.href = hash;
    },
  },
  components: {
    TheNavbar2,
    EditorWrapper,
    HomeCTA,
    SvgImage,
    TheFooter,
  },
};
</script>
