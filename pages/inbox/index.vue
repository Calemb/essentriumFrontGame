<template>
  <div>
    <h1> INBOX </h1>
    <div
      v-for="msg in msgs"
      :key="msg._id"
    >
      <nuxt-link :to="'view/' + msg.adresser">Nadawca</nuxt-link>
      :: {{ msg.title }}
      <br>
      {{ msg.content}}
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";
export default {
  data() {
    return {
      msgs: []
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      Requester.get("msg/msgs").then(result => {
        this.msgs = result.data;
      });
    }
  }
};
</script>

<style>
</style>
