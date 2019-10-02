<template>
  <v-container fluid>
    <div class="form-group">
      <label>Search Artist</label>
      <input type="text" class="form-control" placeholder="Enter to search a Artist"
      solo
      v-model="searchText"
      @input="handleSearchArtist" />
    </div>
    <v-flex class="text-center ">
        <span class="title font-weight-light">Have {{ artists.length }} result</span>
      </v-flex>
    <v-layout wrap v-if="artists.length > 0">

      <v-flex
        pa-3
        xs12
        sm6
        md4
        v-for="artist in artists"
        :key="_.get(artist, 'id')"
      >
        <v-card class="mx-auto">
          <div class="d-flex justify-start">
            <img
              width="120px"
              height="120px"
              contain
              class="rounded"
              :src="_.get(artist, 'picture_medium')"
            />
            <div class="px-2 player-container">
              <span class="align-start font-weight-light artist-title my-3"
                >Artist:
                {{ _.get(artist, "name") }}
              </span>
            </div>
          </div>

          <v-card-text
            ><span class="d-block grey--text text-darken-2"
              >Profile: {{ _.get(artist, "link") }}</span
            >
            <span class="d-block grey--text text-darken-3">
              Follow: {{ _.get(artist, "nb_fan") }}
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { get, debounce } from "lodash";
export default {
  name: "Artist",
  mounted() {
    this.$store.dispatch("getArtistByName", { name: "" });
  },
  data() {
    return {
      searchText: "",
      numberOfResult: 0
    };
  },
  computed: {
    ...mapState({
      total: state => get(state, "artist.artist.result.total", 0)
    }),
    ...mapGetters({
      artists: "artists",
    })
  },
  methods: {
    handleSearchArtist: debounce(function(text) {
      this.$store.dispatch("getArtistByName", { name: this.searchText });
    }, 300),
  }
};
</script>

<style scoped>
.artist-title {
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
.form-group{
  margin: 10px;
}
</style>
