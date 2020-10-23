/**
 * SPA JWT 클라이언트 구현 관련 사항 정리.
 * nextapp을 일단 편하게 변환해보자
 */

//utils/auth.js
//로컬 저장. 설정 관련 기능 수행 함수들.

let inMemoryToken;

function login({ jwt_token, jwt_token_expiry}, noRedirect ){
  inMemoryToken = {
    token: jwt_token,
    expiry: jwt_token_expiry,
  };
  if(!noRedirect){
    this.$router.push('/갈곳');
  }
}

async function logout(){
  inMemoryToken = null;
  const url = '/api/logout';
  const response = await fetch(url, {
    method:'POST',
    credentials: 'include',
  });

  //to support logging out from all windows.
  window.localStorage.setItem('logout', Date.now());
  //redirecting 주소는 알아서 지정. 
  this.$router.('/login');
}

const subMinutes = function (dt, minutes){
  //dt로 들어온 시간 - 경과시간(밀리세컨드로 변환).
  return new Date(dt.getTime()- minutes* 60 * 1000);
}

async function auth() {
  const {refresh_token} = 'refresh_token from cookie';//3자 쿠키에서 값 빼는거 가능한가?
  
  if(!inMemoryToken) {
    const cookie = {},
    const url = 'api/refresh-token';
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          // 쿠키가 자동으로 서버로 보내져 쿠키 내의 refresh_token 기반 판별함.
        },
        body : JSON.stringify({})
      });
      if(response.status === 200) {
        const { jwt_token, refresh_token, jwt_token_expiry, refresh_token_expiry, user_id} = await response.json();
        
        //바로 로그인 기능 수행.
        await login({jwt_token, jwt_token_expiry}, true) 
        //로그인 에러 발생.
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
      }
    // 리프레쉬 토큰 획득 실패. 
    } catch(error) {

      this.$router.push('/login');
    }
  }

  const jwt_token = inMemoryToken;
  //클라이언트에서 다시 token 확인 더블 첵
  if(!jwt_token) {
    this.$router('/login');
  }
  return jwt_token;
  
}

function getToken(){
  return inMemoryToken;
}

/**
 *  아래 부분은 react 예제에서 따온 HOC 예제. 때문에 vue 애플리케이션으로 migration 해야함.
 *  아마 mixin 으로 해야할 듯.
 */

function withAuthSync (WrappedComponent) {

  return class extends Component {

    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const token = await auth(ctx)
      if (!inMemoryToken) {
        inMemoryToken = token;
      }
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, accessToken: inMemoryToken }
    }
    


    constructor (props) {
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
    }

    async componentDidMount () {
      this.interval = setInterval(async () => {
        if (inMemoryToken){
          if (
            subMinutes(new Date(inMemoryToken.expiry), 1) <= 
            new Date(inMemoryToken.expiry)
            ) {
            inMemoryToken = null;
            const token = await auth()
            inMemoryToken = token;
          }
        } else {
          const token = await auth()
          inMemoryToken = token;
        }
      }, 60000);

      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      clearInterval(this.interval)
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}

export { login, logout, withAuthSync, auth, getToken} 