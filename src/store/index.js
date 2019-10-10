import Vue from 'vue'
import Vuex from 'vuex'

import track from './track'
import artist from './artist'
import album from './album'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    track,
    artist,
    album
  }
})
