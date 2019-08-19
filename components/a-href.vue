<template>
  <!-- @click="click($event)" -->
  <nuxt-link v-bind:to="'/'+to">
    {{ title }}
  </nuxt-link>
</template>

<script>
import requester from "~/components/request-cfg";

export default {
  props: {
    title: String,
    to: String
  },
  methods: {
    defaultParse: function(response) {
      console.log("res", response);
      document.getElementById("nuxtApp").innerHTML = JSON.stringify(response);
    },
    click: function(event) {
      console.log("a-href clicked");
      if (event) {
        event.preventDefault();
        requester
          .getPage(this.href)
          .then(response => this.defaultParse(response.data))
          .catch(response => this.defaultParse(response));
      }
    }
  }
};
</script>

<style>
</style>
