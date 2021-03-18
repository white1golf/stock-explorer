// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },
  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: 'src/assets/icons',
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: 'icons.[hash:8].svg', // or 'img/icons.svg' if filenameHashing == false
        /**
         * vue-cli svg-sprite 플러그인은 svg-sprite-loader를 감싸 vue-cli plugin으로 만든 형태
         * 따라서 자세한 옵션은 svg-sprite-loader를 사용함. svg-sprite-loader는 svgo를 사용하는데
         * svgo에 정의된 prefix 옵션을 통해 개별 symbol 마다 id 용 prefix 값을 줄 수 있는데
         * svg-sprite-loader는 편하게도 굳이 svgo 옵션을 넘겨줄 필요없이 symbolId 값에 원하는 프리픽스 값을
         * 명시적으로 적어 주면 됨.
         */
        symbolId: 'icon--[name]',
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true,
      },
    },
  },
};
