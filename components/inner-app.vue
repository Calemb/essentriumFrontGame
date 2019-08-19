<template>
  <div>
    <div class="topNav">
      <avatar />
      <header>
        <!-- <logo /> -->
        <aHref
          to="admin"
          title="ADMIN"
        ></aHref>
        <aHref
          to="travel"
          title="Travel"
        ></aHref>
        <aHref
          title="GUILD"
          to="guild"
        ></aHref>
        <aHref
          title="MSG"
          to="inbox"
        >
          <inbox />
        </aHref>
        <aHref
          title="LogOUT"
          to="logout"
        ></aHref>
      </header>
    </div>
    <nuxt id="nuxtApp" />
    <footer>
      &copy; 2019
      <br>
      <a href="http://essentrium.net">ESSENTRIUM.NET</a>
      <br>
      {{ debug }}
    </footer>
  </div>
</template>

<script>
import Avatar from "~/components/Avatar";
import Logo from "~/components/Logo";
import Inbox from "~/components/Inbox";
import aHref from "~/components/a-href";

export default {
  components: {
    Avatar,
    Logo,
    Inbox,
    aHref
  },
  data() {
    return {
      debug: ""
    };
  }
};
</script>

<style>
h1 {
  clear: both;
  width: 100%;
  float: left;
}
header {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: baseline;
}
#nuxtApp,
#nuxtApp div {
  padding: 0px 15px;
  display: flex;
  flex-wrap: wrap;
  word-wrap: normal;
  max-width: 100%;
}
.topNav {
  width: 100%;
  height: 50px;

  /* border: 1px solid orangered; */
  display: inline-flex;
  align-items: flex-start;
  border-bottom: 1px dashed gray;
  margin-bottom: 15px;
}
.topNav .avatar,
.topNav header {
  box-sizing: border-box;
  min-height: 100%;
}
.topNav .avatar {
  width: 25%;
}
.topNav header {
  /* border: 1px solid yellow; */
  width: 75%;
  overflow: hidden;
}
</style>
