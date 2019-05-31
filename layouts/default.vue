<template>
  <v-app
    dark
    class="essentrium"
  >
    <header>
      <nuxt-link to="/admin">ADMIN</nuxt-link>
      <nuxt-link to="/">
        <logo />
      </nuxt-link>
      <avatar />
      <nuxt-link to="/travel">Travel</nuxt-link>
      <nuxt-link to="/guild">GUILD</nuxt-link>
      <nuxt-link to="/inbox">
        <inbox />
      </nuxt-link>
      <nuxt-link to="/logout">LOGOUT</nuxt-link>
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
import Logo from "~/components/Logo";
import Avatar from "~/components/Avatar";
import Chat from "~/components/Chat";
import Inbox from "~/components/Inbox";
import Requester from "~/components/request-cfg";

export default {
  components: {
    Logo,
    Avatar,
    Chat,
    Inbox
  },
  data() {
    return {
      debug: "",
      adminPriviliges: false
    };
  },
  mounted: function() {
    this.LoadPriviliges();
  },
  methods: {
    LoadPriviliges: function() {
      Requester.get("_account").then(response => {
        const priviliges = response.data.priviliges;
        if (priviliges.includes("admin")) {
          this.adminPriviliges = true;
        }
      });
    }
  }
};
</script>
<style>
textarea {
  border: 1px solid gray;
}
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
