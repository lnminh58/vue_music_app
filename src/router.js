import Vue from 'vue'
import Router from 'vue-router'
import Track from './views/Track.vue'
import Artist from './views/Artist.vue'
import TracKDetail from './views/TractDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Track',
      component: Track
    },
    {
      path: '/artist',
      name: 'Artist',
      component: Artist
    },
    {
      path: '/trackDetail',
      name: 'TrackDetail',
      component: TracKDetail
    }
  ]
})
