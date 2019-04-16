<template>
  <div>
    {{l_name}}: {{name}}
    <div>
      <span
        v-for="(stat, index) in stats"
        :key="index"
      >{{stat.l_name}}: {{stat.value}}</span>
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

export default {
  data() {
    return {
      l_name: "",
      name: "",
      stats: []
    };
  },
  mounted() {
    this.LoadPlayer();
  },
  methods: {
    LoadPlayer: function() {
      Requester.get("_player")
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
span {
  display: block;
}
</style>
