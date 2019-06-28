<template>
  <div>
    <button>ADD +</button>
    <div class="playersList">
      <div
        v-for="(player,index) in players"
        :key="player._id"
      >
        <span
          v-for="(val, key) in player"
          :key="key"
        >
          {{ key }}:
          <input
            v-if="typeof(val) !== 'object'"
            type="text"
            class="propValue"
            v-model="player[key]"
            :disabled="key == '_id'"
          >
          <!-- :value="val" -->
          <div v-else>
            <span
              v-for="(subVal, subKey) in val[0]"
              :key="subKey"
            >
              {{subKey}}:
              <input
                type="text"
                class="propValue"
                v-model="val[0][subKey]"
                :disabled="subKey == '_id'"
              >
              <!-- :value="subVal" -->
            </span>
          </div>
        </span>
        <div>
          <button @click="Save(index)">Save</button>
          <button @click="Delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";

export default {
  data() {
    return {
      players: []
    };
  },
  mounted: function() {
    this.LoadPlayer();
  },
  methods: {
    LoadPlayer: function() {
      Requester.get("admin/players").then(results => {
        this.players = results.data;
      });
    },
    Save: function(index) {
      //WORKING ADD & DELETE!
      console.log(this.players[index]);

      Requester.post("admin/players", {
        updatedPlayer: this.players[index]
      }).then(result => {
        this.LoadPlayer();
      });
    },
    Delete: function() {}
  }
};
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
.propValue {
  padding: 1px;
}
.playersList {
  display: flex;
}
</style>
