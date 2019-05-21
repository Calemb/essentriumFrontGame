<script>
import Axios from "axios";
const config = {
  prod: {
    url: "51.38.129.191",
    portWs: "80"
  },
  dev: {
    url: "127.0.0.1",
    portWs: "80"
  }
};

export default {
  requester: Axios,
  //
  //CONFIG HERE - BEGIN
  //
  config: config.prod,
  //
  //CONFIG HERE - END
  //
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
  urlGame: function(path) {
    return "http://" + this.config.url + "/game/" + path;
  },
  urlWs: function() {
    return this.config.url + ":" + this.config.portWs;
  }
};
</script>
