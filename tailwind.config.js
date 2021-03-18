module.exports = {
  important: '#app',
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class',
  /**
   * 기존 프로젝트에선 scss에 정의된 reset 스크립트가 존재하기 때문에 tailwind
   * base에 존재하는 unset 관련 스크립트 기능을 끕니다.(preflight라고 불림.)
   */
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      //ring을 hover variants에도 사용
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [],
};
