<template>
  <div class="hello">
    <div v-if="logedIn" class="nonuser">
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
  data,
};
</script>

<style>
</style>