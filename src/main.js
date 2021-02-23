import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import svgSpriteLoader from './helpers/svg-sprite-loader';

const __svg__ = {
  path: './assets/icons/*.svg',
  name: 'assets/icons/[hash].sprite.svg',
};

svgSpriteLoader(__svg__.filename);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
