<script>
import Axios from "axios";
const config = {
  prod: {
    url: "51.38.129.212",
    portWs: "80"
  },
  dev: {
    url: "127.0.0.1:3001",
    portWs: "3001"
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
    return this.requester.delete(this.apiUrlGame(path), {
      withCredentials: true
    });
  },
  getPage: function(path) {
    return this.requester.get(this.urlPageGame(path), {
      withCredentials: true
    });
  },
  get: function(path) {
    return this.requester.get(this.apiUrlGame(path), {
      withCredentials: true
    });
  },
  post: function(path, data) {
    return this.requester.post(this.apiUrlGame(path), data, {
      withCredentials: true
    });
  },
  urlPageGame: function(path) {
    return "http://" + this.config.url + "/game/" + path;
  },
  apiUrlGame: function(path) {
    return "http://" + this.config.url + "/api/game/" + path;
  },
  urlWs: function() {
    return this.config.url + ":" + this.config.portWs;
  }
};
</script>
