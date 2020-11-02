const LOCAL_HOST = 'http://localhost:3000';
const BACKEND_SERVER = 'https://imadoer.herokuapp.com';
const SERVER = LOCAL_HOST;
export default {
  logout: function() {
    return fetch(SERVER + '/auth/logout', {
      method: 'POST',
      credentials: 'include', //반드시 필요함.
    });
  },
  auth: function() {
    return fetch(SERVER + '/auth/refresh-token', {
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
    return fetch(SERVER + '/auth/login', {
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
