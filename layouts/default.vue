<template>
  <v-app dark>
    <logo/>
    <avatar />
    <nuxt-link to="/">Home: /game</nuxt-link>
    <nuxt-link to="/travel">Travel</nuxt-link>
    <nuxt id="app"/>
    <v-footer>FOOTER
      <br>
      {{ debug }}
    </v-footer>
  </v-app>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Avatar from "~/components/Avatar.vue";
export default {
  components: {
    Logo,
    Avatar
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
</style>
