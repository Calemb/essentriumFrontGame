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
  urlGame: function(path) {
    return "http://127.0.0.1:3000/game/" + path;
  }
};
</script>
