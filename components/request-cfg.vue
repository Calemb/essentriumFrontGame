<script>
import Axios from "axios";

export default {
  requester: Axios,
  get: function(path) {
    return this.requester.get(this.urlGame(path), { withCredentials: true });
  },
  urlGame: function(path) {
    console.log("tst");
    return "http://127.0.0.1:3000/game/" + path;
  }
};
</script>
