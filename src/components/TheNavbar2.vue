<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <span
          class="navbar-burger"
          :class="{ 'is-active': isMenuActive }"
          @click="isMenuActive = !isMenuActive"
        >
          <span />
          <span />
          <span />
        </span>
      </div>
      <div class="navbar-middle">
        <TheSearch />
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
        <div v-if="!isAuthenticated" class="navbar-end">
          <router-link to="/signup" exact class="navbar-item">
            회원가입
          </router-link>
          <router-link to="/login" class="navbar-item">
            로그인
          </router-link>
        </div>
        <div v-else class="navbar-end">
          <router-link to="/logout" class="navbar-item">
            로그아웃
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import TheSearch from '@/components/TheSearch';

export default {
  components: {
    TheSearch,
  },
  data() {
    return {
      isMenuActive: false,
      isAuthenticated: false,
    };
  },
  methods: {
    closeMenu() {
      this.isMenuActive = false;
    },
  },
  mounted() {
    this.$eventHub.$on('navigate', this.closeMenu);
  },
};
</script>
