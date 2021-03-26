<template>
  <div class="post-card">
    <div class="title">{{ post.title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      //객체나 어레이는 default 속성을 함수의 반환값으로 넘겨야함.
      default: function () {
        return { title: '빈 타이틀' };
      },
    },
  },
};
</script>

<style>
</style>