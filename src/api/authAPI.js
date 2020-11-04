const URL = process.env.URL ? process.env.URL : process.env.VUE_APP_URL;
export default {
  logout: function() {
    return fetch(URL + '/auth/logout', {
      method: 'POST',
      credentials: 'include', //반드시 필요함.
    });
  },
  auth: function() {
    return fetch(URL + '/auth/refresh-token', {
      method: 'POST',
      credentials: 'include', //반드시 필요함
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        //쿠키는 자동으로 서버 전송.
      },
      body: JSON.stringify({}),
    });
  },
  login: function(user) {
    return fetch(URL + '/auth/login', {
      method: 'POST',
      credentials: 'include', //cookie 설정을 위해 반드시 필요.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
  },
};
