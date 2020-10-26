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
      inMemoryToken: {},
      jwtToken: '',
      jwtTokenExpiry: '',
      userId: '',
      refreshToken: '',
      refreshTokenExpiry: '',
    };
  },
  computed: {
    isTokenEmpty() {
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
      if (this.isTokenEmpty) {
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
              expiry,
              refresh_token_expiry,
              user_id,
            } = await response.json();
            //inMemoryToken 저장.(noRedirect == true)
            await this.login({ jwt_token, jwt_token_expiry }, true);
            /**
             *  첫 로그인 시(refresh token cookie 존재 x )
             *  또는 기타 에러 발생 시.
             */
          } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
          //위의 throw 된 error를 처리.
        } catch (error) {
          console.log('엘마쵸~');
          this.$router.push('/login');
        }
      }

      //inMemoryToken 다시 체크.
      const jwt_token = this.inMemoryToken;
      if (this.isTokenEmpty) {
        this.$router.push('/login');
      }
      return jwt_token;
    },

    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        this.$router.push('/login');
      }
    },
  },

  async created() {
    // TODO: static getInitialProps 내 코드였는데...
    //이 것을 created로 옮기는 게 맞는가?
    const token = await this.auth();
    if (this.isTokenEmpty) {
      this.inMemoryToken = token;
    }

    /**
     * syncLogout의 경우 window에 eventLisener에 의해 등록되기 때문에
     * 실행 시 this가 변경되는 것을 방지하기 위해 this bind를 수행함.
     */
    this.syncLogout = this.syncLogout.bind(this);
  },

  async mounted() {
    interval = setInterval(async () => {
      //1. 이미 토큰을 가지고 있을 때.
      if (this.inMemoryToken) {
        if (
          this.subMinutes(new Date(this.inMemoryToken.expiry), 1) <=
          new Date(this.inMemoryToken.expiry)
        ) {
          this.inMemoryToken = {};
          const token = await this.auth();
          this.inMemoryToken = token;
        }
      } else {
        const token = await this.auth();
        this.inMemoryToken = token;
      }
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
