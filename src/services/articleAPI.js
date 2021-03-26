/**
 * vue-cli-service 사용으로 build 나 serve 등의 기본 명령어가 production, development 모드로 자동 변환되며 모드 변환은 자동으로 NODE_ENV 값을 해당 모드이름으로 설정함.
 * 헷갈리지 않도록 env.production 과 env.document에도 명시적으로 NODE_ENV 값은 설정해준 상태. 로컬 테스트 시와 aws 배포시 api 주소는 다르니 그건 VUE_APP_* 라는 명칭으로 시작하는
 * 환경변수로 설정해야 함.
 *
 * 참고: https://cli.vuejs.org/guide/mode-and-env.html#modes
 *
 */
const URL = process.env.VUE_APP_URL_IP;
console.log(`url 확인: ${URL}`);

export default {
  save: function(path, content) {
    return fetch(URL + `/article/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
      }),
    });
  },
};
