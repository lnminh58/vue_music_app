<template>
  <div class="container flex">
    <div
      class="col-xs-12 col-sm-8 col-md-8 col-lg-8 track form-group"
      style="height: 100%; display: block"
    >
      <h3 class="mb-1px mt-0">
        <span class="label label-info">Song: {{ _.get(track, "title") }}</span>
      </h3>
      <div class="d-flex justify-start mt-2">
        <img
          width="100%"
          height="600px"
          contain
          class="rounded"
          :src="_.get(track, 'album.cover_xl')"
        />
      </div>
      <audio controls class="d-flex player">
        <source :src="_.get(track, 'preview')" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div class="form-group my-1">
        <div class="alert alert-success my-0" role="alert">
          Rank: {{ _.get(track, "rank") }}
        </div>
        <div class="alert alert-success my-0" role="alert">
          Date: {{ _.get(track, "release_date") }}
        </div>
        <div class="alert alert-success my-0" role="alert">
          <a :href="_.get(track, 'link')">Full MP3</a>
        </div>
      </div>
    </div>
    <div class="row" style="height: 100%">
      <div class="col-xs-12 col-sm-8 col-md-8 col-lg-12 pb-1" style="height: 50%">
        <div class="mx-2">
          <h3 class="mb-1px mt-0">
            <span class="label label-warning"
              >Album: {{ _.get(album, "title") }}</span
            >
          </h3>
          <div class="scrollmenu">
            <ul class="form-group pa-0">
              <li
                class="alert pt-0 pb-1"
                style="color: blue"
                v-for="item in tracksArr"
                :key="item"
              >
                {{ item.title }}
                <audio controls class="d-flex player my-0">
                  <source :src="_.get(item, 'preview')" type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>
                <a :href="_.get(item, 'link')"> >> Full MP3 </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-8 col-md-8 col-lg-12 pt-0" style="height: 50%">
        <div class="mx-2">
          <h3 class="mb-1px mt-0">
            <span class="label label-success"
              >Artist: {{ _.get(artist, "name") }}</span
            >
          </h3>
          <div class="form-group my-1">
            <div class="alert alert-success my-0" role="alert">
              Number Of Fan: {{ _.get(artist, "nb_fan") }}
            </div>
            <div class="alert alert-success my-0" role="alert">
              Number Of Album: {{ _.get(artist, "nb_album") }}
            </div>
            <div class="alert alert-success my-0" role="alert">
              <a :href="_.get(artist, 'link')"
                >Explore the {{ _.get(artist, "name") }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { get, debounce } from "lodash";

export default {
  data() {
    return {
      tracksArr: []
    };
  },
  props: {
    trackId: String
  },
  async mounted() {
    await this.$store.dispatch("getTrackByID", this.trackId);
    await this.$store.dispatch("getAlbumByID", this.track.album.id);
    this.album.tracks.data.forEach(element => {
      return this.tracksArr.push(element);
    });
    await this.$store.dispatch("getArtistByID", this.track.artist.id)
  },
  computed: {
    ...mapState({
      requesting1: state => get(state, "track.trackDetail.requesting"),
      requesting2: state => get(state, "album.album.requesting"),
      requesting3: state => get(state, "artist.artistDetail.requesting"),
    }),
    ...mapGetters({
      track: "track",
      album: "album",
      artist: "artist",
    })
  },
  methods: {}
};
</script>

<style scoped>
.container {
  min-height: 100%;
  /* background-image: linear-gradient(to right, #00b7ff, #ffffc7); */
}
.player-container {
  flex: 1;
}
.player {
  width: 100%;
}
.title {
  color: rgb(0, 183, 255);
}
.track {
  background-color: none;
  border: 2px none;
  border-radius: 10px;
}
.rounded {
  border: 2px none;
  border-radius: 10px;
  margin-bottom: 2px;
}
.player {
  border: 2px none;
  border-radius: 10px;
}
ul {
  list-style: none;
}
li {
  margin-bottom: 1px;
  background-image: linear-gradient(to right, #b066fe, #63e2ff);
}
.alert-success,
.alert-success2,
.alert-success1 {
  background-image: linear-gradient(to right, #00a8c5, #ffff7e);
}
.alert-success1 {
  background-image: linear-gradient(to right, #00a8c5, #ffff7e);
}
.alert-success2 {
  background-image: linear-gradient(to right, #00a8c5, #ffff7e);
}
.label {
  background-image: linear-gradient(to right, #fca5f1, #b5ffff);
  color: #000;
  font-family: "Arizonia";
  font-size: 20px;
}
div.scrollmenu {
  overflow: auto;
  height: 600px;
  margin-bottom: 0px
}
</style>
