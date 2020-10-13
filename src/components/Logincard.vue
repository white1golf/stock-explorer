<template>
  <div class="c">
    <div class="c__title">
      <h2>환영합니다! 😆</h2>
      <h3>로그인 해주세요</h3>
    </div>
    <div class="c__body">
      <form @submit.prevent="login">
        <div class="c__field">
          <label class="c__field__label" for>이메일</label>
          <div
            :class="{
              c__field__control: !isEmailFocused,
              c__field__control_focused: isEmailFocused,
            }"
          >
            <input
              class="c__field__input"
              type="email"
              v-model="email"
              @focus="isEmailFocused = true"
              @blur="isEmailFocused = false"
            />
          </div>
          <p class="c__field__help" v-show="visibleEmailHelp">
            {{ emailHelpMsg }}
          </p>
        </div>
        <div class="c__field">
          <label class="c__field__label" for>비밀번호</label>
          <div
            :class="{
              c__field__control: !isPasswordFocused,
              c__field__control_focused: isPasswordFocused,
            }"
          >
            <input
              class="c__field__input"
              type="password"
              v-model="password"
              @focus="isPasswordFocused = true"
              @blur="isPasswordFocused = false"
            />
          </div>
          <p class="c__field__find">
            <a href="#">비밀번호를 잊으셨나요?</a>
          </p>
          <p class="c__field__help" v-show="visiblePwdHelp">{{ pwdHelpMsg }}</p>
        </div>
        <div class="c__field">
          <button>로그인</button>
          <p>
            계정이 필요한가요?
            <router-link to="/signup">
              가입하기
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/auth/login';

export default {
  name: 'LogInCard',
  data() {
    return {
      count: 0,
      email: '',
      password: '',
      visibleEmailHelp: false,
      visiblePwdHelp: false,
      emailHelpMsg: '',
      pwdHelpMsg: '',
      isEmailFocused: false,
      isPasswordFocused: false,
    };
  },
  computed: {},
  methods: {
    async login() {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email.value,
          password: this.password.value,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        // TODO redirect
        console.log(json);
        console.log('redirect');
      } else {
        // TODO show error
        console.log('error occured');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_logincard.scss';
</style>
