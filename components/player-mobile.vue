<template>
  <div>
    <h1>{{stats.name}}</h1>
    <div>
      <span
        v-for="(stat, index) in stats"
        :key="index"
      >
        {{index}} : {{stat}}
      </span>
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

export default {
  data() {
    return {
      stats: ""
    };
  },
  mounted() {
    this.LoadPlayer();
  },
  methods: {
    LoadPlayer: function() {
      Requester.get("_player")
        .then(response => {
          this.stats = response.data;
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
span {
  display: block;
}
</style>
