<template>
  <v-app
    dark
    class="essentrium"
  >
    <header>
      <nuxt-link to="/">
        <logo />
      </nuxt-link>
      <avatar />
      <nuxt-link to="/travel">Travel</nuxt-link>
      <nuxt-link to="/guild">guild</nuxt-link>
    </header>
    <nuxt id="app" />
    <chat
      v-bind:guildName="'testGuildName'"
      v-bind:cityName="'testCityName'"
    />
    <v-footer>
      &copy; 2019 - Sculpt0r (<a href="essentrium.net"> ESSENTRIUM.NET </a>)
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
.essentrium header .avatar,
.essentrium header .logo {
  display: inline-block;
}
.essentrium header a,
.essentrium header .avatar {
  border: 1px solid #888;
  padding: 2px 5px;
}
</style>
