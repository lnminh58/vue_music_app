<template>
  <div class="container">
    <p>Track ID: {{ trackId }}</p>
    <button class="btn btn-primary" @click="getTrackDetail">
      getTrackDetail
    </button>
    <p>Ranking: {{ track }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import { get, debounce } from "lodash";

export default {
  props: {
    trackId: Number
  },
  computed: {
    ...mapState({
      requesting: state => get(state, "track.trackDetail.requesting")
    }),
    ...mapGetters({
      track: "track",
    })
  },
  methods: {
    getTrackDetail(trackId) {
      this.$store.dispatch("getTrackByID", this.trackId);
      console.log(this.track)
    }
  },
};
</script>
