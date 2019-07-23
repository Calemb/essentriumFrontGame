<template>
  <div></div>
</template>

<script>
import requester from "~/components/request-cfg";
export default {
  mounted: function() {
    requester.get("logout").then(response => {
      if (response.data && response.data.location) {
        window.location = response.data.location;
      }
    });
  }
};
</script>

<style>
</style>
