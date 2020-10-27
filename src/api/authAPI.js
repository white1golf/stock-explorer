export default {
  logout: function() {
    return fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },
  auth: function() {
    return fetch('/api/refresh-token', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        //쿠키는 자동으로 서버 전송.
      },
      body: JSON.stringify({}),
    });
  },
  login: function(user) {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        password: user.password,
      }),
    });
  },
};
