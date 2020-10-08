<template>
  <div class="content">
    <h2 class="content-title">
      {{ title }}
    </h2>
    <p class="content-description">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.contentData.title,
      description: this.contentData.description,
    };
  },

  props: {
    contentData: Object,
  },

  methods: {},
};
</script>
