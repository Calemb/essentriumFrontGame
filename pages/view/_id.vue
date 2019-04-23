<template>
  <div>
    <h1>{{ playerData.name }}</h1>
    ({{ id }})
    <p v-for="(value, key) in playerData" :key="key">{{ key }}: {{ value }}</p>
    <br>MSG me!
    <br>FIGHT me!
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";

export default {
  data() {
    return {
      id: "",
      playerData: {}
    };
  },
  mounted: function() {
    //WORKING  -get player with that id data
    this.id = this.$nuxt._route.params.id;
    Requester.get("view/" + this.id).then(response => {
      console.log(response);
      this.playerData = response.data;
    });
  }
};
</script>

<style>
</style>
