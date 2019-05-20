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
      <nuxt-link to="/guild">GUILD</nuxt-link>
      <nuxt-link to="/inbox">
        <inbox />
      </nuxt-link>
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
import Inbox from "~/components/Inbox.vue";

export default {
  components: {
    Logo,
    Avatar,
    Chat,
    Inbox
  },
  data() {
    return {
      debug: ""
    };
  },
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
header a {
  display: inline-block;

}
</style>
