<template>
  <main class="contents-container">
    <Content v-for="item in items" :key="item.id" :contentData="item" />
  </main>
</template>

<script>
import Content from '@/components/Content';
import data from '@/data/data.json';
export default {
  components: {
    Content,
  },

  data() {
    return {
      numbers: 0,
      items: data,
    };
  },

  props: {},

  methods: {},
};
</script>
