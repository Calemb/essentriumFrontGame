<template>
  <div>
    <h1> ADMIN PANEL</h1>
    <div class="innerNav">
      <aHref
        to="admin/news"
        title="News"
      ></aHref>
      <aHref
        to="admin/players"
        title="Players"
      ></aHref>
    </div>
  </div>
</template>

<script>
import aHref from "~/components/a-href";
export default {
  components: {
    aHref
  }
};
</script>

<style>
.innerNav a {
  margin: 0px 5px;
}
</style>
