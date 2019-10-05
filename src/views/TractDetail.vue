<template>
  <div class="container">
    <p>Track ID: {{ trackId }}</p>
  </div>
</template>

<script>

export default {
  props: {
    trackId: String
  },
  data() {
    return {

    };
  },
  created() {
    console.log(this.trackId)
  },
  methods: {

  }
};
</script>
