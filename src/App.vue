<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
let interval;

export default {
  name: 'App',

  data() {
    return {
      inMemoryToken: {}, // 메모리 저장 accessToken. 쿠키의 refresh token 을 기반으로 서버에서 제공.
      jwtToken: '',
      jwtTokenExpiry: '',
      userId: '',
      refreshToken: '',
      refreshTokenExpiry: '',
    };
  },
  computed: {
    isAccessTokenEmpty() {
      return Object.keys(this.inMemoryToken).length == 0 ? true : false;
    },
  },
  methods: {
    async login({ jwt_token, jwt_token_expiry }, noRedirect) {
      this.inMemoryToken = {
        token: jwt_token,
        expiry: jwt_token_expiry,
      };
      if (!noRedirect) {
        this.$router.push('/갈곳');
      }
    },
    async logout() {
      this.inMemoryToken = null;
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      window.localStorage.setItem('logout', Date.now());
      this.$router.push('/login');
    },

    subMinutes(dt, minutes) {
      return new Date(dt.getTime() - minutes * 60 * 1000);
    },
    //위로가기 기능.
    scrollTo(hash) {
      location.href = hash;
    },

    async auth() {
      // token empty => 유저가 로그인 하지 않았다.
      if (this.isAccessTokenEmpty) {
        const url = 'api/refresh-token';
        try {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              //쿠키 자동으로 서버 전송.
            },
            body: JSON.stringify({}),
          });
          if (response.status === 200) {
            const {
              jwt_token,
              refresh_token,
              jwt_token_expiry,
              refresh_token_expiry,
              user_id,
            } = await response.json();
            //inMemoryToken 저장.(noRedirect == true)
            await this.login({ jwt_token, jwt_token_expiry }, true);
            /**
             *  첫 로그인 시(refresh token cookie 존재 하지 않아 access token 발급이 안됨. )
             *  또는 기타 상황(인터넷 접속)등에 의한 실패 시.
             */
          } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
          //위의 throw 된 error를 처리.
          //예) 쿠키가 없다.
        } catch (error) {
          console.log(`auth fn: refresh 토큰 기반 로그인 실패`);
          console.log(`원인 : ${error}`);
        }
      }

      return this.inMemoryToken;
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

    await this.auth();

    /**
     * syncLogout의 경우 window에 eventLisener에 의해 등록되기 때문에
     * 실행 시 this가 변경되는 것을 방지하기 위해 this bind를 수행함.
     */
    this.syncLogout = this.syncLogout.bind(this);
  },

  async mounted() {
    interval = setInterval(async () => {
      //1. 이미 토큰을 가지고 있을 때.
      if (!this.isAccessTokenEmpty) {
        if (
          this.subMinutes(new Date(this.inMemoryToken.expiry), 1) <=
          new Date(this.inMemoryToken.expiry)
        ) {
          this.inMemoryToken = {};
          const token = await this.auth();
          this.inMemoryToken = token;
        }
      } //2. else 로 토큰값이 없을 때 this.$router.push()로 페이지 이동 가능.
    }, 60000);

    window.addEventListener('storage', this.syncLogout);

    //해쉬로 가기?
    if (this.$route.hash) {
      //모든 vue instance 들이 mounted 됨을 보장하기 위해 nextTick 사용.
      this.$nextTick(() => this.scrollTo(this.$route.hash));
    }
  },

  beforeUnmout() {
    clearInterval(interval);
    window.removeEventListener('storage', this.syncLogout);
    window.localStorage.removeItem('logout');
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
