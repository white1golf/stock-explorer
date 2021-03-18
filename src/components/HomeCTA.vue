<template>
  <div class="popup-wrapper">
    <div class="title text-2xl font-extrabold tracking-wider">
      간단히 적어봐요
    </div>

    <p class="description pt-4 text-gray-500">
      안녕하세요~! Vue, Express, PostgeSQL을 이용해 메모앱을 개발하는 중입니다.
      제대로 작동하는 지 궁금하신가요? 가입하여 테스트해보세요 🤗
    </p>
    <router-link
      to="signup"
      class="register inline-block cursor-pointer font-bold text-white px-10 py-3 bg-indigo-500 rounded-xl"
    >
      회원가입
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>