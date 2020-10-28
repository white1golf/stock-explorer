<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Constant from './store/constant';
import { mapState } from 'vuex';

let interval;

export default {
  name: 'App',
  methods: {
    async logout() {
      await this.$store.dispatch(Constant.LOGOUT);
      window.localStorage.setItem('logout', Date.now());
      this.$router.push('/login');
    },
    //위로가기 기능.
    scrollTo(hash) {
      location.href = hash;
    },

    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        this.$router.push('/login');
      }
    },
  },

  async created() {
    /**
     * 자동 로그인 유지.
     * 1. refresh token cookie가 없는 경우. => 로그인 시도가 없는 경우 또는, 쿠키가 삭제된 경우.
     *  => auth 메소드에서 에러를 발생시키고 console에 에러를 출력함. token은 여전히 {} 상태.
     * 2. refresh token cookie가 있는 경우. => created 단계에서부터 자동 로그인.
     *  => auth내에서 호출하는 this.login() 메소드에 의해 this.inMemory에 jwt_token, jwt_token_expiry 값이 들어감.
     */

    await this.$store.dispatch(Constant.FETCH_AUTH);

    /**
     * syncLogout의 경우 window에 eventLisener에 의해 등록되기 때문에
     * 실행 시 this가 변경되는 것을 방지하기 위해 this bind를 수행함.
     */
    this.syncLogout = this.syncLogout.bind(this);
  },

  async mounted() {
    interval = window.setInterval(() => {
      this.$store.dispatch(Constant.SILENT_REFRESH);
    }, 60000);
    window.addEventListener('storage', this.syncLogout);

    //해쉬로 가기?
    if (this.$route.hash) {
      //모든 vue instance 들이 mounted 됨을 보장하기 위해 nextTick 사용.
      this.$nextTick(() => this.scrollTo(this.$route.hash));
    }
  },

  beforeUnmout() {
    window.clearInterval(interval);
    window.removeEventListener('storage', this.syncLogout);
    window.localStorage.removeItem('logout');
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
