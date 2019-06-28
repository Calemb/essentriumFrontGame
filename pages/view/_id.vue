<template>
  <div>
    <h1>{{ playerData.name }}</h1>
    ({{ id }})
    <p
      v-for="(value, key) in playerData"
      :key="key"
    >{{ key }}: {{ value }}</p>
    <br>
    <button @click="toggleMsgForm">
      MSG me!
    </button>
    <br>
    <nuxt-link v-bind:to="'/fight/'+id">
      FIGHT me!
    </nuxt-link>
    <msgForm
      v-if="msgFormVisible"
      v-bind:recipientId="id"
    />
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";
import MsgForm from "~/components/msg-form";

export default {
  components: {
    MsgForm
  },
  data() {
    return {
      id: "",
      playerData: {},
      msgFormVisible: false
    };
  },
  mounted: function() {
    this.id = this.$nuxt._route.params.id;
    Requester.get("view/" + this.id).then(response => {
      console.log(response);
      this.playerData = response.data;
    });
  },
  methods: {
    toggleMsgForm: function() {
      this.msgFormVisible = !this.msgFormVisible;
    }
  }
};
</script>

<style>
</style>
