<template>
  <div class="container flex">
    <div
      class="col-xs-12 col-sm-8 col-md-8 col-lg-8 track form-group"
      style="height: 100%; display: block"
    >
      <h3 class="mb-1px mt-0">
        <span class="label label-info">Song: {{ _.get(track, "title") }}</span>
      </h3>
      <div class="d-flex justify-start">
        <img
          width="100%"
          height="600px"
          contain
          class="rounded"
          :src="_.get(track, 'album.cover_big')"
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
        <div class="alert alert-info my-0" role="alert">
          Date: {{ _.get(track, "release_date") }}
        </div>
        <div class="alert alert-warning my-0" role="alert">
          <a :href="_.get(track, 'link')">Full MP3</a>
        </div>
      </div>
    </div>
    <div class="row" style="height: 100%">
      <div class="col-xs-12 col-sm-8 col-md-8 col-lg-12" style="height: 50%">
        <div class="mx-2">
          <h3 class="mb-1px mt-0">
            <span class="label label-warning"
              >Album: {{ _.get(track, "album.title") }}</span
            >
          </h3>
          <div class="form-group my-1">
            <div class="alert alert-success my-0" role="alert">
              Rank: {{ _.get(track, "rank") }}
            </div>
            <div class="alert alert-info my-0" role="alert">
              Date: {{ _.get(track, "album.release_date") }}
            </div>
            <div class="alert alert-warning my-0" role="alert">
              <a :href="_.get(track, 'album.link')"
                >Listen more track in album</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-8 col-md-8 col-lg-12" style="height: 50%">
        <div class="mx-2">
          <h3 class="mb-1px mt-0">
            <span class="label label-success"
              >Artist: {{ _.get(track, "artist.name") }}</span
            >
          </h3>
          <div class="form-group my-1">
            <div class="alert alert-success my-0" role="alert">
              Rank: {{ _.get(track, "rank") }}
            </div>
            <div class="alert alert-info my-0" role="alert">
              Date: {{ _.get(track, "release_date") }}
            </div>
            <div class="alert alert-warning my-0" role="alert">
              <a :href="_.get(track, 'artist.link')"
                >Explore the {{ _.get(track, "artist.name") }}</a
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
  props: {
    trackId: String
  },
  async mounted() {
    await this.$store.dispatch("getTrackByID", this.trackId);
    console.log(this.track);
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

<style scoped>
.container {
  min-height: 100%;
  background-image: linear-gradient(
    rgb(23, 75, 75),
    rgb(40, 55, 78),
    rgb(84, 72, 110)
  );
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
</style>
