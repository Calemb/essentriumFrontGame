<template>
  <div>
    {{debug}}
    <br>
    Title: <input
      type="text"
      v-model="editedNews.title"
    >
    <br>
    Content: <textarea v-model="editedNews.content"></textarea>
    <br>
    <button @click="SendNews">SEND</button>

    <div>
      <div
        v-for="entry in news"
        :key="entry.key"
      >
        <p> {{ entry.title }} :: {{ entry.content }}</p>
        <button @click="Edit(entry)">Edit</button>
        <button @click="Delete(entry)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";
export default {
  data() {
    return {
      debug: "",
      editedNews: {
        _id: "",
        title: "",
        content: ""
      },
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
    Edit: function(entry) {
      this.editedNews = entry;
    },
    Delete: function(entry) {
      Requester.delete("news/" + entry._id).then(result => {
        this.debug = result.data;
        this.LoadNews();
      });
    },
    SendNews: function() {
      Requester.post("news", {
        _id: this.editedNews._id,
        title: this.editedNews.title,
        content: this.editedNews.content
      }).then(result => {
        this.debug = result.data;
        this.LoadNews();
      });
    }
  }
};
</script>

<style>
</style>
