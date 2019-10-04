import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import lodash from './mixins/lodash';
import Paginate from 'vuejs-paginate';

Vue.component('paginate', Paginate)
Vue.config.productionTip = false

export const eventBus = new Vue();

const mixins = [lodash];
mixins.forEach(mixin => Vue.mixin(mixin));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
