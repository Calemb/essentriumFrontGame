<template>
  <div>
    <v-alert small :value="true" type="success" color="success">Global {{coords}}</v-alert>
    <v-alert small :value="true" type="success" color="success">Inner {{coordsInner}}</v-alert>
    <div>
      <v-btn small @click="Travel('N')">N</v-btn>
      <v-btn small @click="Travel('S')">S</v-btn>
      <v-btn small @click="Travel('W')">W</v-btn>
      <v-btn small @click="Travel('E')">E</v-btn>
    </div>
    <div>
      <v-btn small @click="TravelInner('N')">sn</v-btn>
      <v-btn small @click="TravelInner('S')">ss</v-btn>
      <v-btn small @click="TravelInner('W')">sw</v-btn>
      <v-btn small @click="TravelInner('E')">se</v-btn>
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg.vue";
export default {
  data() {
    return {
      coords: { x: 0, y: 0 },
      coordsInner: { x: 0, y: 0 }
    };
  },
  mounted() {
    this.LoadCoords();
  },
  methods: {
    LoadCoords: function() {
      Requester.get("_coords").then(response => {
        this.coords = response.data.coords;
        this.coordsInner = response.data.coordsInner;
      });
    },
    Travel: function(direction) {
      Requester.post("_coords", { direction: direction }).then(response => {
        this.coords = response.data.coords;
        this.coordsInner = response.data.coordsInner;
      });
    },
    TravelInner: function(direction) {
      Requester.post("_coords", { direction: direction, inner: true }).then(
        response => {
          this.coordsInner = response.data.coordsInner;
        }
      );
    }
  }
};
</script>

<style>
</style>
