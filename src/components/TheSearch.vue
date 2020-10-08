<template>
  <div class="search" :class="{ 'is-active': isActive }">
    <div class="wrapper">
      <input
        id="input"
        class="input"
        v-model="text"
        v-bind:placeholder="sentence"
        @focus="isActive = !isActive"
        @blur="isActive = !isActive"
      />
      <span class="icon">
        <i v-if="!isTyped" class="fas fa-search"></i>
        <i v-else @click="deleteText" class="fas fa-times-circle"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sentence: '검색...',
      text: '',
      isActive: false,
    };
  },
  computed: {
    isTyped() {
      if (this.text === '') {
        return false;
      }
      return true;
    },
  },
  props: {},
  methods: {
    deleteText() {
      this.text = '';
    },
  },
};
</script>
