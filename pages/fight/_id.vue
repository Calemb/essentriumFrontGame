<template>
  <div>
    <p>FAST - simple fight / also need fit to PvE!</p>
    <button @click="fastFight">FAST</button>
    <br>
    <p>TURN base - allow player choose each action -> also inform attacked player to join battle & defend !</p>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";
export default {
  data() {
    return {
      enemyId: ""
    };
  },
  mounted: function() {
    this.enemyId = this.$nuxt._route.params.id;
  },
  methods: {
    fastFight: function() {
      Requester.post("fight/fast", { enemyId: this.enemyId }).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style>
</style>
