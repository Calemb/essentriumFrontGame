<template>
  <div class="objFrame">
    <!-- OBJDISP: -->
    
    <!-- <button @click="Add('')">Add ''</button>
    <button @click="Add({})">Add {}</button>
    <button @click="Add([])">Add []</button> -->
    <span
      v-for="(val, key) in objectToDisplay"
      :key="key"
    >
      {{key}}:
      <span v-if="typeof(val) !== 'object'">
        <input
          type="text"
          class="propValue"
          v-model="objectToDisplay[key]"
          :disabled="key == '_id'"
        >
        <button @click="DeleteProperty(key)">DEL</button>
      </span>
      <objectDisplay
        v-else
        :objectToDisplay="val"
      />
    </span>
  </div>
</template>

<script>
import objectDisplay from "~/components/object-display";

export default {
  name: "objectDisplay",
  components: {
    objectDisplay
  },
  props: ["objectToDisplay"],
  data() {
    return {
      newKey: ""
    };
  },
  methods: {
    Add: function(initVal) {
      this.$set(this.objectToDisplay, this.newKey, initVal);
    },
    DeleteProperty: function(key) {
      this.$delete(this.objectToDisplay, key);
    }
  }
};
</script>

<style>
.objFrame {
  border: 1px solid gray;
  padding: 0px 5px;
}
</style>
