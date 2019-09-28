import Vue from 'vue'
import Vuex from 'vuex'

import track from './track';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    track
  }
})
