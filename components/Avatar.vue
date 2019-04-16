<template>
  <div class="avatar">
    <nuxt-link to="/stats">{{ name }}</nuxt-link>
    <br>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

export default {
  data() {
    return {
      name: "",
      pageContent: ""
    };
  },
  mounted() {
    this.LoadPlayer();
  },
  methods: {
    LoadPlayer: function() {
      Requester.get("_player-fast")
        .then(response => {
          this.name = response.data.name;

          this.stats = response.data.stats;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("final....");
        });
    }
  }
};
</script>

<style>
</style>
