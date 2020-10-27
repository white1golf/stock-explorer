export default {
  //Action and Mutation
  SUBMIT_SIGNUP: 'submitSignup', //회원 가입
  SUBMIT_LOGIN: 'submitLogin', //사용자 로그인.
  UPDATE_RES: 'updateRes', // response state 반영.
  SILENT_REFRESH: 'silentRefresh', //slient refresh
  //Action only
  FETCH_AUTH: 'fetchAuth', //Auth Store State Update

  //Mutation only
  LOGOUT: 'logout', //로그아웃
  MAKE_AUTHENTICATED: 'makeAuthenticated', //isAuthenticated 값 변경.
};
