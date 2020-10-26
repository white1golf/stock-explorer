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
      return new Date(dt.getTimes() - minutes * 60 * 1000);
    },
    //위로가기 기능.
    scrollTo(hash) {
      location.href = hash;
    },

    async auth() {
      if (Object.keys(this.inMemoryToken).length == 0) {
        const url = 'api/refresh-token';
        try {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
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
            await this.login({ jwt_token, jwt_token_expiry }, true);
          } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        } catch (error) {
          this.$router.push('/login');
        }
      }

      const jwt_token = this.inMemoryToken;
      if (!jwt_token) {
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
    const token = await this.auth();
    if (!this.inMemoryToken) {
      this.inMemoryToken = token;
    }
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
    window.localStorage.remoteItem('logout');
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
