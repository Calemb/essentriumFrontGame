<template>
  <div>
    <input
      type="text"
      v-model="title"
    >
    <textarea v-model="content"></textarea>
    <button @click="send">Send</button>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";

export default {
  props: ["recipientId"],
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    send: function() {
      Requester.post("msg", {
        recipientId: this.recipientId,
        title: this.title,
        content: this.content
      }).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style>
input,
textarea {
  display: block;
  min-width: 25px;
  border: 2px solid goldenrod;
}
</style>
