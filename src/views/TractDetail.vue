<template>
  <div class="container">
    <p>Track ID: {{ trackId }}</p>
    <button class="btn btn-primary" @click="getTrackDetail">
      getTrackDetail
    </button>
    <p>Ranking: {{ track.rank }}</p>
    <template>
  <v-row align="center" justify="center">
    <v-img
      src="https://picsum.photos/id/11/500/300"
      lazy-src="https://picsum.photos/id/11/10/6"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
    ></v-img>
  </v-row>
</template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import { get, debounce } from "lodash";

export default {
  props: {
    trackId: String
  },
  computed: {
    ...mapState({
      requesting: state => get(state, "track.trackDetail.requesting"),
      result: state => get(state, 'trackDetail.result')
    }),
    ...mapGetters({
      track: "track",
    }),
  },
  methods: {
    getTrackDetail(trackId) {
      this.$store.dispatch("getTrackByID", this.trackId);
      console.log('track', this.track)
    },
  },
};
</script>
