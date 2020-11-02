import Vue from 'vue';
import Vuex from 'vuex';
import Constant from './constant';
import authAPI from '../api/authAPI';
import { isEmpty } from '@/utils/utils.js';

Vue.use(Vuex);

function subMinutes(dt, minutes) {
  return new Date(dt.getTime() - minutes * 60 * 1000);
}

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {},
    jwtToken: '',
    jwtTokenExpiry: 0,
    inMemoryToken: {},
    refreshToken: '',
    refreshTokenExpiry: 0,
    res: {},
  },

  mutations: {
    [Constant.LOGOUT]: (state, payload) => {
      state.inMemoryToken = {};
      state.res = payload;
      state.jwtToken = '';
      state.jwtTokenExpiry = 0;
      state.refreshToken = '';
      state.refreshTokenExpiry = 0;
      state.user = {};
      state.isAuthenticated = false;
    },
    [Constant.UPDATE_RES]: (state, payload) => {
      //payload 가 error 객체라 이렇게 넣는게 맞는지는 잘 모르겠음...
      state.res = payload;
    },

    //payload의 response 값이 200 일 때만 호출 됨.
    [Constant.FETCH_AUTH]: (state, payload) => {
      const {
        jwt_token,
        refresh_token,
        jwt_token_expiry,
        refresh_token_expiry,
        user_id,
      } = payload; //payload 는 res.json()의 결과값.
      state.inMemoryToken = {
        token: jwt_token,
        expiry: jwt_token_expiry,
      };
      state.jwtToken = jwt_token;
      state.jwtTokenExpiry = jwt_token_expiry;
      state.refreshToken = refresh_token;
      state.refreshTokenExpiry = refresh_token_expiry;
      state.user = { id: user_id };
      state.isAuthenticated = true;
    },

    //
    [Constant.MAKE_AUTHENTICATED]: (state, payload) => {
      state.isAuthenticated = payload;
    },
  },

  actions: {
    [Constant.SUBMIT_LOGIN]: async (store, payload) => {
      if (!store.isAuthenticated) {
        try {
          const response = await authAPI.login(payload);
          if (response.status === 200) {
            store.commit(Constant.FETCH_AUTH, response);
          } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        } catch (error) {
          store.commit(Constant.UPDATE_RES, error);
        }
      }
    },

    //TODO: 일단 signupcard.vue에서 signup 함수를 직접 구현함.
    //이를 action으로 빼야할까? 생각해 볼 것.
    [Constant.SUBMIT_SIGNUP]: (store, payload) => {},
    [Constant.LOGOUT]: async store => {
      try {
        const response = await authAPI.logout();
        store.commit(Constant.LOGOUT, response);
      } catch (err) {
        //network 에러 발생시.
        console.log('ERR_CONNECTION_REFUSED -> 네트워크 확인해볼래유?');
      }
    },
    //Action - FETCH_AUTH 는 access_token 재발급 프로세스.
    [Constant.FETCH_AUTH]: async store => {
      /**
       * 1. 앱이 refresh 버튼 등으로 재시작 된 경우.
       *    store.state.inMemoryToken === null,
       *    호출 경로 : created hook 에서 직접 dispatch.
       *
       * 2. 주기적 수행되는 silent refresh.
       *    store.state.inMemoryToken !== null,
       *    호출 경로 : mounted hook에 의해 setInterval로 등록된 silent refresh action
       *    단 silent refresh 에서 inMemoryToken !== null 과 재인증 주기 체크 통과.
       *
       * 3. 다른 탭에 열려있는 동일 앱에서 login 이벤트가 발생한 경우.
       *
       * 위의 세 가지 경우 모두 쿠키내 refresh-token 값이 존재.
       *
       */

      try {
        const response = await authAPI.auth();
        //response는 cookie 내 refresh token 의 존재 유무에 따라 값이 달라짐.
        if (response.status === 200) {
          //fetch api 의 response에서 json() 메소드는 promise 반환 타입.
          store.commit(Constant.FETCH_AUTH, await response.json());
          //만일 cookie 내 refresh token 이 존재치 않거나 존재하지만 그 값이
          //사용자에게 할당된 refresh token 과 값이 다른 경우.
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        // 네트워크 에러 발생...
      } catch (error) {
        store.commit(Constant.UPDATE_RES, error);
      }
    },
    [Constant.SILENT_REFRESH]: async store => {
      //access 토큰이 존재할 때.
      if (!isEmpty(store.state.inMemoryToken)) {
        if (
          //호출 상황: setInterval에 의해 등록된 콜백.
          //만료시간 1분 이하.
          subMinutes(new Date(store.state.inMemoryToken.expiry), 1) <=
          new Date(store.state.inMemoryToken.expiry)
        ) {
          await store.dispatch(Constant.FETCH_AUTH);
        }
      }
    },
  },
  modules: {},
});
