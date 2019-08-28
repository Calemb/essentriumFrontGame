<template>
  <span>
    <nuxt-link
      v-if="mode == 'SPA'"
      v-bind:to="'/'+to"
    >
      {{ title }}
    </nuxt-link>
    <a
      :href="'/'+to"
      v-else-if="mode == 'AJAX'"
      @click="clickAction($event)"
    >
      {{ title }}
      ({{ mode }})
    </a>
  </span>
</template>

<script>
import requester from "~/components/request-cfg";
//ASSUME lin in App could do 2 things:
//- call async request for data (GET)
//- call async request for page (!) SPA page will be to big with all subpages
export default {
  props: {
    title: String,
    to: String,
    //possible values: SPA(for SPA requests), AJAX(sending request)
    mode: { type: String, default: 'SPA' }
  },
  methods: {
    parseResponseAsPage: function (response) {
      console.log("res", response);
      document.getElementById("nuxtApp").innerHTML = JSON.stringify(response);
    },
    clickAction: function (event) {
      event.preventDefault()
      event.stopPropagation()

      if (event) {
        if (this.mode == 'AJAX-PAGE') {
          this.getAjaxPage(event)
        } else {
          this.getAjax(event)
        }
      }
    },
    getAjaxPage: function (event) {
      requester
        .getPage(this.href)
        .then(response => this.parseResponseAsPage(response.data))
        .catch(response => this.parseResponseAsPage(response))
    },
    getAjax: function (event) {
      requester
        .postPlain(this.to, {})
        .then(response => this.$emit('logout', response))
        .catch(response => this.$emit('logout', response))
    }
  }
}
</script>

<style>
</style>
