<template>
  <section class="profile">
    <div @click="isMenuActive = !isMenuActive">
      <Avatar class="avatar" :size="40" :username="userName"></Avatar>
    </div>
    <div class="dropdown-menu" :class="{ 'is-active': isMenuActive }">
      <router-link to="/setting" class="menu-item">
        설정
      </router-link>
      <a class="logout menu-item" @click="logout">
        로그아웃
      </a>
    </div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
import Constant from '../store/constant';

export default {
  components: {
    Avatar,
  },

  data() {
    return {
      isMenuActive: false,
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

  methods: {
    closemenu() {
      this.isMenuActive = false;
    },
    async logout() {
      await this.$store.dispatch(Constant.LOGOUT);
      window.localStorage.setItem('logout', Date.now());
      if (this.$router.currentRoute.path === '/') {
        this.$router.go();
      } else this.$router.push('/');
    },
  },

  mounted() {
    this.$eventHub.$on('navigate', this.closeMenu);
  },
};
</script>
