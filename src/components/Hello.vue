<template>
  <div class="hello">
    <div v-if="!isAuthenticated" class="nonuser">
      <h1 class="title">누구세요?</h1>
      <p>🤔🤔🤔🤔</p>
    </div>
    <div v-else class="user">
      <h1 class="title">안녕하세요.{{ userName }}님!</h1>
      <p>😁😁😁😁</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    userName() {
      return this.$store.state.user.id;
    },
  },
};
</script>

<style></style>
