<template>
  <span>
    <aHref
      title="MSG"
      to="inbox"
    >
    </aHref>( {{ unreadCount }} )
  </span>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

import aHref from "~/components/a-href";
export default {
  components: {
    aHref
  },
  data () {
    return {
      unreadCount: 0
    };
  },
  mounted: function () {
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
