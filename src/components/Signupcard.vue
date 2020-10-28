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
            {{ errMsg }}
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
const LOCAL_URL = 'http://localhost:3000/auth/signup';
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
      errMsg: '',
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
          email: this.email,
          password: this.password,
        }),
      });

      if (response.ok) {
        //response.ok 는 반환값 코드 중 200~299번에 해당되는 경우 true를 반환하는 값.
        // TODO redirect
        console.log('redirect');
        this.$router.push('/');
        // statusCode 200번대가 아닐 때.
      } else {
        const json = await response.json();
        // error json은 {message, stack}의 속성을 가짐.
        this.errMsg = json.message;
        //this.errMsgStack = json.stack;
        console.log('signup api error occured');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_logincard.scss';
</style>
