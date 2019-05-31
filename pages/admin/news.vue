<template>
  <div>
    {{debug}}
    Title: <input
      type="text"
      v-model="title"
    >
    <br>
    Content: <textarea v-model="content"></textarea>
    <br>
    <button @click="SendNews">SEND</button>

    <div>
      <p
        v-for="entry in news"
        :key="entry.key"
      >
        {{ entry.title }} :: {{ entry.content }}
      </p>
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";
export default {
  data() {
    return {
      debug: "",
      title: "",
      content: "",
      news: []
    };
  },
  mounted: function() {
    this.LoadNews();
  },
  methods: {
    LoadNews: function() {
      Requester.get("news").then(response => {
        this.news = response.data;
      });
    },
    SendNews: function() {
      Requester.post("news", {
        title: this.title,
        content: this.content
      }).then(result => {
        this.debug = result.data;
      });
    }
  }
};
</script>

<style>
</style>
