<template>
  <div>
    <nuxt-link to="/game/stats">{{ l_name }}</nuxt-link>
    {{ name }}
    <br>
    <logo/>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Requester from "~/components/request-cfg.vue";

export default {
  components: {
    Logo
  },
  data() {
    return {
      name: "",
      l_name: ""
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
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
