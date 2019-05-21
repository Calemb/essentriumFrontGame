<script>
import Axios from "axios";

export default {
  requester: Axios,
  delete: function(path) {
    return this.requester.delete(this.urlGame(path), {
      withCredentials: true
    });
  },
  get: function(path) {
    return this.requester.get(this.urlGame(path), {
      withCredentials: true
    });
  },
  post: function(path, data) {
    return this.requester.post(this.urlGame(path), data, {
      withCredentials: true
    });
  },
  url: "127.0.0.1",
  portWs: "80",
  urlGame: function(path) {
    return "http://" + this.url + "/game/" + path;
  },
  urlWs: function() {
    return this.url + ":" + this.portWs;
  }
};
</script>
