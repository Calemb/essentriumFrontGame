<template>
  <div
    id="app"
    v-scroll="scrollMe"
  >
    <!-- v-touch="{
        left: () => swipe(1),
        right: () => swipe(-1),
      }" -->
    <div id="swipeNav">
      <div id="character">
        <h1>
          CHA
        </h1>
      </div>
      <innerApp id="innerApp">
      </innerApp>
      <chat
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
//WORKING multi screen mobile nav with swipe https://codepen.io/pen/?&editable=true&editors=101
export default {
  components: {
    InnerApp,
    Chat
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
      ]
    };
  },
  mounted: function() {
    this.LoadPriviliges();
    this.SetupLayout();
  },
  methods: {
    AdjustPages: function() {
      this.navPages.forEach((page, index) => {
        let value = 100 * index + this.navSide * -100;
        document.getElementById(page).style.left = value + "vw";
        console.log(value);
      });
    },
    ExtractNumber: function(cssValue) {
      return Number(cssValue.replace("vw", ""));
    },
    SetupLayout: function() {
      // let prevClientX = 0;
      this.AdjustPages();
      document
        .getElementById(this.navItem)
        .addEventListener("touchmove", event => {
          //show animation
          let size = event.touches[0].clientX - this.lastTouchX;
          this.touchXSize = size;
          this.touchMoveXDir = Math.sign(size);
          console.log("Scrollen");

          this.navPages.forEach((page, index) => {
            let current = this.ExtractNumber(
              document.getElementById(page).style.left
            );
            let value = this.touchMoveXDir; // * 0.01;
            let compValue = current + Number(value);

            let max = index * 100;
            let min = max - 200;

            if (compValue >= min && compValue <= max) {
              document.getElementById(page).style.left = compValue + "vw";
            }
          });

          this.lastTouchX = event.touches[0].clientX;
        });
      document
        .getElementById(this.navItem)
        .addEventListener("touchend", event => {
          console.log(this.touchMoveXDir);

          if (
            this.navSide + this.touchMoveXDir >= 0 &&
            this.navSide + this.touchMoveXDir <= this.navMax
          ) {
            this.navPages.forEach((page, index) => {
              const value = this.ExtractNumber(
                document.getElementById(page).style.left
              );
              const period = 100;

              const border = period / 2;

              const progres = Math.floor(Math.abs(value) / period);
              //(progress + 1) * 100 -> how many 'pages' is div scrollen to left or right
              let startVal = (progres + 1) * period;
              let curValue = Math.abs(value);

              if (Math.sign(this.touchMoveXDir) > 0 && value < 0) {
                curValue = startVal - curValue;
              } else if (Math.sign(this.touchMoveXDir) < 0 && value > 0) {
                curValue = startVal - curValue;
              }

              const diff = curValue % period;

              let snapVal = 0;

              if (diff >= border) {
                snapVal = value + this.touchMoveXDir * (period - diff);
              } else {
                //just back by current diff in pixel
                snapVal = value + this.touchMoveXDir * -1 * diff;
              }
              console.log(snapVal);
              document.getElementById(page).style.left = snapVal + "vw";
            });
          }
        });

      // zbierz panele,
      // ustaw widocznosc dla głównego
      // przy swipie:
      //   - docelowy ma sie animowac na widok
      //   - aktualny ma sie schowac w zaleznosci od strony na ktora idzie swipe
    },
    scrollMe: function() {
      console.log("scrollen");
    },
    swipe: function(direction) {
      if (
        this.navSide + direction >= 0 &&
        this.navSide + direction <= this.navMax
      ) {
        // width na 100vw nie daje nam normlanie dragowac ekranu, ale z kolei
        // po przesunieciu marginesu gubi msContentScript
        // moze na detect swipe wyrównywac tylko scrollY ?

        let targetAnimValue = (this.navSide + direction) * -1 * 100;
        this.AnimSwipeNav(targetAnimValue, 0);

        //change anim nav
        this.navSide += direction;

        console.log(direction);
      }
    },
    AnimSwipeNav: function(targetValue, time) {
      document.getElementById(this.navItem).style.left = targetValue + "vw";
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
header {
  text-align: center;
  border-bottom: 1px solid gray;
  padding: 5px 0px;
  margin-bottom: 5px;
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
  border: 1px solid peru;
  margin: 0px;
  padding-bottom: 50px;
}

#chat {
  position: fixed;
  border: 1px solid red;
  width: 35vw;
  height: 60vh;
  /* border: 1px solid peru; */
}
#character {
  display: none;
}
@media only screen and (max-width: 920px) {
  #character,
  #innerApp,
  #chat {
    /* height: 100vh; */
    overflow: hidden;

    display: inline-block;
    position: relative;

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
  border: 10px solid red;
  height: 100vh;
  width: 100vw;
  left: 0vw;
  top: 0px;
  display: block;
  position: absolute;
  /* touch-action: none; */
}
</style>
