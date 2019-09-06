<template>
  <div class="msgs">
    <h1> INBOX </h1>
    <div
      v-if="details.title != ''"
      class="messageDetails"
    >
      {{ details.title}}
      <br>
      {{ details.content }}

    </div>
    <!-- -->
    <div
      v-for="msg in msgs"
      :key="msg._id"
    >
      <nuxt-link
        v-if="msg.owner === msg._adresserId"
        :to="'view/' + msg._receiverId"
      >Receiver</nuxt-link>
      <nuxt-link
        v-else
        :to="'view/' + msg._adresserId"
      >Adresser</nuxt-link>
      :: {{ msg.title }}
      <br>
      {{ msg.content.substring(0, 15) }}
      <button @click="read(msg)">
        read
      </button>
    </div>

  </div>
</template>

<script>
import Requester from "~/components/request-cfg";
export default {
  data () {
    return {
      msgs: [],
      details: {}
    };
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    read: function (msg) {
      this.details = msg
      if (msg.read === false) {
        Requester.post('msg/readed', { 'id': msg._id })
          .then(response => {
            console.log('mark as readed')

          })
      }
    },
    loadData: function () {
      Requester.get("msg/msgs").then(result => {
        this.msgs = result.data;

      });
    }
  }
};
</script>

<style>
.msgs {
  flex-direction: column;
  justify-content: space-between;
}
.msgs div {
  margin: 10px 0px;
}
.messageDetails {
  display: block;
  clear: both;
  width: 100%;
  border: 1px solid red;
}
</style>
