<template>
  <div id="app">
    <div id="swipeNav">
      <div id="character">
        <PlayerMobile />
      </div>
      <div
        class="playerIndicator indicator"
        v-bind:class="{ navDisabled: navSide==navMax}"
        @click="GoNav(1)"
      ></div>
      <innerApp id="innerApp">
      </innerApp>
      <div
        class="chatIndicator indicator"
        v-bind:class="{ navDisabled: navSide==0}"
        @click="GoNav(-1)"
      ></div>
      <chat
        id="chat"
        v-bind:guildName="'testGuildName'"
        v-bind:cityName="'testCityName'"
      />
    </div>
  </div>
  <!-- </v-app> -->
</template>
<script>
import Chat from "~/components/Chat";

import InnerApp from "~/components/inner-app";
import Requester from "~/components/request-cfg";
import PlayerMobile from "~/components/player-mobile";
import touchSupported from "~/components/touch-detect";
//WORKING widok ekranow na desktop'a
// na mobilu jest minimalne good enough!
export default {
  components: {
    InnerApp,
    Chat,
    PlayerMobile
  },
  data() {
    return {
      adminPriviliges: false,
      navSide: 1,
      navMax: 2,
      navItem: "swipeNav",
      touchXSize: 0,
      lastTouchX: 0,
      touchMoveXDir: 0,
      navPages: [
        "character", //0
        "innerApp", //100
        "chat" //200
      ],
      navPagesInitValues: []
    };
  },
  mounted: function() {
    this.LoadPriviliges();
    this.AdjustPages();
  },
  methods: {
    GoNav: function(dir) {
      this.navigateTo(dir);
    },
    AdjustPages: function() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      console.log("Screen width: ", width);

      if (width < 921) {
        this.navPages.forEach((page, index) => {
          let value = 100 * index + this.navSide * -100;
          document.getElementById(page).style.left = value + "vw";
        });
        this.navPages.forEach((page, index) => {
          this.navPagesInitValues[index] = this.ExtractNumber(
            document.getElementById(page).style.left
          );
        });
      }
    },
    ExtractNumber: function(cssValue) {
      return Number(cssValue.replace("vw", ""));
    },
    navigateTo: function(direction) {
      console.log(this.navPagesInitValues);

      if (
        this.navSide + direction >= 0 &&
        this.navSide + direction <= this.navMax
      ) {
        this.navPages.forEach((page, index) => {
          let value = this.ExtractNumber(
            document.getElementById(page).style.left
          );

          const snapVal = value + direction * 100;

          document.getElementById(page).style.left = snapVal + "vw";
        });
        this.navSide += direction;
      }
    },
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
/* * {
  box-sizing: border-box;
} */
a {
  text-decoration: none;
  color: rgb(255, 97, 23);
  font-variant: small-caps;
  letter-spacing: 1px;
}
a::first-letter {
  color: #fff;
}
a:hover {
  color: #fff;
}
a:hover:first-letter {
  color: rgb(255, 97, 23);
}
#app,
#swipeNav {
  background-color: #000;
  /* border:3px solid green; */
  color: #fff;
  height: 100vh;
  display: block;
  white-space: nowrap; /*Prevents Wrapping*/

  overflow-x: hidden;
  /* overflow-y: auto; */
}
footer {
  position: fixed;
  height: auto;
  border-top: 1px solid gray;
  padding: 5px 0px;
  /* margin-top: 5px; */
  text-align: center;
  background-color: #000;
  width: 100%;
  bottom: 0px;
}
header > * {
  /* border: 3px solid red; */
  display: inline-block;
  padding: 1px 5px;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
}

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
#innerApp {
  /* border: 1px solid peru; */
  margin: 0px;
  padding-bottom: 50px;
}

#chat {
  position: fixed;
  /* border: 1px solid red; */
  width: 35vw;
  height: 60vh;
  right: 0px;
  /* border: 1px solid peru; */
}
#character {
  display: none;
}
.indicator {
  display: none;
  position: absolute;
  z-index: 9;

  width: 70px;
  height: 70px;

  background-color: rgba(0, 128, 255, 0.8);

  border-radius: 15px;

  bottom: 15px;
}
.chatIndicator {
  right: 0px;
}
@media only screen and (max-width: 920px) {
  .indicator {
    display: block;
  }
  #character {
    left: -100vw;
  }
  #innerApp {
    left: 0vw;
  }
  #chat {
    left: 100vw;
  }

  #character,
  #innerApp,
  #chat {
    overflow-x: hidden;
    overflow-y: scroll;

    display: inline-block;
    position: absolute;

    vertical-align: top;
    /* white-space: nowrap; */
    border: 1px solid blue;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    width: 100vw;
    height: 100%;
  }
}

#swipeNav {
  /* border: 1px solid red; */
  height: 100vh;
  width: 100vw;
  left: 0vw;
  top: 0px;
  display: block;
  position: absolute;
  /* touch-action: none; */
}
.navDisabled {
  display: none;
}
</style>
