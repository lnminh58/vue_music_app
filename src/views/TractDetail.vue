<template>
  <div class="container">
    <button class="btn btn-primary" @click="getTrackID">Show TrackID</button>
    <p>Track ID: {{ track.trackID }}</p>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  data() {
    return {
      track: {
        trackID: ''
      }
    };
  },
  created() {
    eventBus.$on("getTrackID", (TrackID) => {
      this.track.trackID = TrackID;
    })
  },
  methods: {
    getTrackID() {
      console.log('detail ID', this.track.trackID);
    }
  }
};
</script>
