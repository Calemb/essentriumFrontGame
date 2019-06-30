<template>
  <div>
    <div class="playersList">
      <div
        v-for="(player,index) in players"
        :key="player._id"
      >
        <div>
          <button @click="Copy(index)">Clone</button>
          <button @click="Save(index)">Save</button>
          <button @click="Delete(index)">Delete</button>
        </div>
        <objectDisplay :objectToDisplay="player" />
      </div>
    </div>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg";
import objectDisplay from "~/components/object-display";
export default {
  components: {
    objectDisplay
  },
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
    Copy: function(index) {
      let newData = JSON.stringify(this.players[index]);
      let newObject = JSON.parse(newData);
      this.IterateObjectValues(newObject);

      this.players.push(newObject);
    },
    Delete: function(index) {
      Requester.delete("admin/players/" + this.players[index]._id).then(
        result => {
          console.log(result.data);
          this.LoadPlayer();
        }
      );
    },
    Save: function(index) {
      //WORKING ADD & DELETE player and .... field!
      console.log(this.players[index]);

      Requester.post("admin/players", {
        updatedPlayer: this.players[index]
      }).then(result => {
        this.LoadPlayer();
      });
    },
    IterateObjectValues: function(obj) {
      for (var property in obj) {
        console.log(typeof obj[property]);

        if (typeof obj[property] !== "object") {
          this.$delete(obj, "_id");
        } else {
          this.IterateObjectValues(obj[property]);
        }
      }
    }
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
