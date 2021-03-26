<template>
  <div class="posts-list">
    <PostCard v-for="post in posts" :key="post.id" />
  </div>
</template>

<script>
import PostCard from '@/components/Editor/PostCard';
export default {
  components: {
    PostCard,
  },
};
</script>

<style>
</style>