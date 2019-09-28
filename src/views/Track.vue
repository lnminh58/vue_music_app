<template>
  <v-container fluid>
    <v-text-field
      class="mx-3 mt-3"
      placeholder="Enter to search a track"
      solo
      v-model="searchText"
      @input="handleSearchTrack"
    ></v-text-field>
    <v-layout wrap v-if="tracks.length > 0">
      <v-flex
        pa-3
        xs12
        sm6
        md4
        v-for="track in tracks"
        :key="_.get(track, 'id')"
      >
        <v-card class="mx-auto">
          <div class="d-flex justify-start">
            <img
              width="120px"
              height="120px"
              contain
              class="rounded"
              :src="_.get(track, 'album.cover_medium')"
            />
            <div class="px-2 player-container">
              <span class="align-start font-weight-light track-title my-3">
                {{ _.get(track, "title") }}
              </span>
              <audio controls class="d-flex player">
                <source :src="_.get(track, 'preview')" type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          <v-card-text
            ><span class="d-block grey--text text-darken-2"
              >Album: {{ _.get(track, "album.title") }}</span
            >
            <span class="d-block grey--text text-darken-3">
              Artist: {{ _.get(track, "artist.name") }}
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap="" v-else>
      <v-flex class="text-center ">
        <span class="title font-weight-light">No result</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { get, debounce } from "lodash";

export default {
  name: 'Track',
  mounted() {
    this.$store.dispatch("getTrackByName", { name: "" });
  },
  data() {
    return {
      searchText: ""
    };
  },
  computed: {
    ...mapState({
      total: state => get(state, "track.track.result.total", 0)
    }),
    ...mapGetters({
      tracks: "tracks"
    })
  },
  methods: {
    handleSearchTrack: debounce(function(text) {
      this.$store.dispatch("getTrackByName", { name: this.searchText });
    }, 600)
  }
};
</script>

<style scoped>
.track-title {
  text-shadow: 1px 1px 3px #000000aa !important;
  color: #555;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3em;
  line-height: 1.5em;
}
.rounded {
  border-top-left-radius: 5px;
}
.player-container {
  flex: 1;
}
.player {
  width: 100%;
}
</style>
