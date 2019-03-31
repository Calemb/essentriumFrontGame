<template>
  <div id="chat">
    <div id="content">
      {{ debug}}
      <br>treści!
      <br>
      <p v-for="(msg, index) in guildMsgs" :key="index">{{msg}}</p>
    </div>
    <button>Guild ({{ guildName }})</button>
    <button>City</button>
    <button>Location</button>
    <br>
    <input type="text" placeholder="msg" v-model="msg">
    <button @click="send">Send</button>
  </div>
</template>

<script>
import io from "~/plugins/socket.io.js";

export default {
  props: ["guildName", "cityName"],

  data() {
    return {
      msg: "",
      debug: "",
      activeTab: "guild",
      guildMsgs: ["msg1"],
      socketGuild: undefined,
      socketCity: undefined,
      socketLocation: undefined
    };
  },
  watch: {
    guildMsgs: {
      handler: (newOne, oldOne) => {
        console.table(newOne);
      },
      deep: true
    }
  },
  mounted: function() {
    if (this.guildName !== "") {
      this.debug = "Pospinać guildName przez bazę danych włącznie!";

      this.socketGuild = io("127.0.0.1:3000/" + this.guildName);

      // this.socketGuild.on("error", reason => {
      //   console.log(reason);
      // });
      // this.socketGuild.on('connected', () => {
      //   console.log('CONNECTED!')
      // // })
      this.socketGuild.on("msg", msg => {
        console.log("rec: " + msg);
        this.guildMsgs.push(msg);
      });
      //   this.socketGuild.emit("msg", { msg: "test" }, function(data) {
      //     console.log(data);
      //   });
      // });
    }
    if (this.cityName !== "") {
      this.socketCity = io("127.0.0.1:3000/" + this.cityName);
      this.socketCity.on("msg", data => {
        console.log("msg income city");
      });
    }

    this.socketLocation = io("127.0.0.1:3000/location");
    this.socketLocation.on("msg", data => {
      console.log("msg income location");
    });
  },
  methods: {
    chooseSocket: function(name) {
      switch (name) {
        case "guild":
          return this.socketGuild;
          break;
        case "location":
          return this.socketLocation;
          break;
        case "city":
          return this.socketCity;
          break;
      }
    },
    //use sockets ?

    // guild-> connect to specyfic namespace
    // location -> common napespace, on serwer decide who should get msg
    // world -> global discussion!

    //switching tabs ==> switch listen channel
    //send to certain channel only
    //for now - don't persistent any msg!
    send: function() {
      const socket = this.chooseSocket(this.activeTab);
      var e = this.socketGuild.emit("msg", this.msg);
      // console.table(e);
      // socket;
      console.log(this.msg);
      // alert(this.msg);
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
  height: 85vh;
}
#content {
  display: block;
  border: 1px solid green;
  height: 75%;
}
button {
  border: 1px solid gray;
  padding: 20px 20px;
}
input {
  border: 1px solid yellow;
  padding: 15px;
}
</style>
