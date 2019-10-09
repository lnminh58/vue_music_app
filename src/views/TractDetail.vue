<template>
  <div class="container">
    <p>Track ID: {{ trackId }}</p>

    <p>Ranking: {{ track.rank }}</p>
    <template>
      <v-row align="center" justify="center">
        <v-img
          :src="_.get(track, 'album.cover_big')"
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
import { mapState, mapGetters } from "vuex";
import { get, debounce } from "lodash";

export default {
  props: {
    trackId: String
  },
  async mounted() {
    await this.$store.dispatch("getTrackByID", this.trackId);
    console.log(this.track)
  },
  computed: {
    ...mapState({
      requesting: state => get(state, "track.trackDetail.requesting")
    }),
    ...mapGetters({
      track: "track"
    })
  },
  methods: {}
};
</script>
