import Vue from 'vue';
import Vuex from 'vuex';
import Constant from './constant';
import authAPI from '../api/authAPI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: null,
    jwtToken: '',
    jwtTokenExpiry: 0,
    inMemoryToken: null,
    refreshToken: '',
    refreshTokenExpiry: 0,
    res: null,
  },

  mutations: {
    [Constant.LOGOUT]: (state, payload) => {
      state.inMemoryToken = null;
      state.res = payload;
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
      } = payload.json();
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
    [Constant.SUBMIT_SIGNUP]: (store, payload) => {},
    [Constant.LOGOUT]: async store => {
      const response = await authAPI.logout();
      store.commit(Constant.LOGOUT, response);
    },
    [Constant.VERIFY_AUTH]: async store => {
      if (!store.state.inMemoryToken) {
        try {
          const response = await authAPI.auth();
          if (response.status === 200) {
            store.commit(Constant.FETCH_AUTH, response);
          } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
          // 쿠키 없을 때. 또는 어떤 이유든 간에...
        } catch (error) {
          store.commit(Constant.UPDATE_RES, error);
        }
      }
    },
  },
  modules: {},
});
