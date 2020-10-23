<template>
  <div class="c">
    <div class="c__title">
      <h2>언제나 환영이야!🧐</h2>
      <h3>회원등록</h3>
    </div>
    <div class="c__body">
      <form @submit.prevent="signup">
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
            여기 비밀번호 validation 올 예정..
          </p>
          <p class="c__field__help" v-show="visiblePwdHelp">{{ pwdHelpMsg }}</p>
        </div>
        <div class="c__field">
          <button>가입하기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const LOCAL_URL = '127.0.0.1:3000/auth/signup';
const API_URL = 'https://imadoer.herokuapp.com/auth/signup';

export default {
  name: 'Signupcard',
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
    async signup() {
      const response = await fetch(LOCAL_URL, {
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
        this.$router.push('/');
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
