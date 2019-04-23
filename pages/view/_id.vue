<template>
  <div>
    ID: {{ id }}
    MSG me!
    FIGHT me!
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: ""
    };
  },
  mounted: function() {
    //WORKING  -get player with that id data
    this.id = this.$nuxt._route.params;
  }
};
</script>

<style>
</style>
