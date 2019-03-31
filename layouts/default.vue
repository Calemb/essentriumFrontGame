<template>
  <v-app dark>
    <logo/>
    <avatar/>
    <nuxt-link to="/">Home: /game</nuxt-link>
    <nuxt-link to="/travel">Travel</nuxt-link>
    <nuxt id="app"/>
    <chat v-bind:guildName="'testGuildName'" v-bind:cityName="'testCityName'"/>
    <v-footer>
      FOOTER
      <br>
      {{ debug }}
    </v-footer>
  </v-app>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Avatar from "~/components/Avatar.vue";
import Chat from "~/components/Chat.vue";

export default {
  components: {
    Logo,
    Avatar,
    Chat
  },
  data() {
    return {
      debug: ""
    };
  },
  // beforeMount() {
  //   socket.on("new-message", message => {
  //     this.messages.push(message);
  //   });
  // },
  methods: {}
};
</script>
<style>
</style>
