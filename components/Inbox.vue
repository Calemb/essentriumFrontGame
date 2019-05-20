<template>
  <span>
    MSG ( {{ unreadCount }} )
  </span>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

export default {
  data() {
    return {
      unreadCount: 0
    };
  },
  mounted: function() {
    //fetch unread msgs count from server
    Requester.get("msg/unreaded").then(response => {
      console.log("INBOX unreaded", response.data);
      this.unreadCount = response.data.count;
    });
  }
};
</script>

<style>
</style>
