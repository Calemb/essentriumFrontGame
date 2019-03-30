<template>
  <div id="chat">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-toolbar height="20px">
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn flat>Guild</v-btn>
              <v-btn flat>Location</v-btn>
              <v-btn flat>World</v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-flex>
        <v-flex xs10>
          <v-text-field placeholder="msg" v-model="msg"></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn @click="send">Send</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    //use sockets ?
    //switching tabs ==> switch listen channel
    //send to certain channel only
    //for now - don't persistent any msg!
    send: function() {
      alert(this.msg);
    }
  }
};
</script>

<style>
#chat {
  border: 1px solid red;
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 50vw;
  height: 35vh;
}
</style>
