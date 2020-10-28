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
import Constant from '../store/constant';

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
  computed: {
    inMemoryToken() {
      return this.$store.state.inMemoryToken;
    },
    res() {
      return this.$store.state.res;
    },
  },
  methods: {
    async login() {
      await this.$store.dispatch(Constant.SUBMIT_LOGIN, {
        email: this.email,
        password: this.password,
      });
      if (this.inMemoryToken !== null) {
        this.$router.push('/'); // 로그인 성공.
      } else {
        //로그인 실패 시
        // 임시로 pwdHelpMsg에 넣어보자.
        this.pwdHelpMsg = this.res;
        this.visiblePwdHelp = true; //이야기를 넣어요.
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_logincard.scss';
</style>
