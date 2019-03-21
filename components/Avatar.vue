<template>
  <div>
    <nuxt-link to="/stats">{{ l_name }}</nuxt-link>
    {{ name }}
    <br>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

export default {
  data() {
    return {
      name: "",
      l_name: "",
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
          this.l_name = response.data.l_name;
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
#con {
  border: 1px solid gray;
}
</style>
