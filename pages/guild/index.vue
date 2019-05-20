<template>
  <div>

    <br>This is Your Guild section!
    <br>
    <div v-if="guild">
      Current guild:
      <span class="guildName">{{ guild.name }}</span>
      Members:
      <ul>
        <li
          v-for="(member, index) in guild.members"
          :key="'m'+index"
        >
          ({{member._id}}) {{ member.name }} - [{{ member.role }}]
          <select v-model="selectedRoles[index]">
            <option
              v-for="(role, index) in roles"
              :key="index"
              v-bind:value="role"
            >{{role}}</option>
          </select>
          <button @click="setRole(index)">Set Role!</button>
        </li>
      </ul>
      <div v-if="requests && requests.length > 0">
        Join requests:
        <ul>
          <li
            v-for="(request, index) in requests"
            :key="index"
          >
            {{ request.playerId }} -
            <button @click="accept(index)">Accept</button>
            <button @click="deny(index)">deny</button>
          </li>
        </ul>
      </div>
      <button @click="deleteGuild">DELETE</button>
    </div>
    <ul>
      <li>You could create new guild, but need to leave current one!</li>
    </ul>
    <input
      type="text"
      name="createGuildName"
      placeholder="new guild name"
      v-model="newGuildName"
    >
    <button @click="create">create</button>
    <p>Ask to join other guilds</p>
    <ul>
      <li
        v-for="(g, index) in guilds"
        :key="index"
      >
        {{g.name}} -
        <button @click="ask(index)">Ask to join!</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

export default {
  data() {
    return {
      newGuildName: "",
      guild: "",
      requests: [],
      guilds: [],
      roles: ["admin", "subadmin", "member"],
      selectedRoles: []
    };
  },
  mounted: function() {
    Requester.get("guild/my").then(result => {
      console.log("guild mounted: ", result.data);

      this.guild = result.data.guild;

      this.requests = result.data.requests;
    });

    Requester.get("guild/all").then(result => {
      this.guilds = result.data;
    });
  },
  methods: {
    setRole: function(membersIndex) {
      Requester.post("guild/role", {
        memberId: this.guild.members[membersIndex]._id,
        newRole: this.selectedRoles[membersIndex]
      }).then(this.debugResults);
    },
    debugResults: function(result) {
      console.log("guild debug", result);
    },
    accept: function(requestsIndex) {
      Requester.get(
        "guild/requests/accept/" + this.requests[requestsIndex]._id
      ).then(this.debugResults);
    },
    deny: function(requestsIndex) {
      Requester.get(
        "guild/requests/deny/" + this.requests[requestsIndex]._id
      ).then(this.debugResults);
    },
    ask: function(guildIndex) {
      Requester.get("guild/ask/" + this.guilds[guildIndex]._id).then(
        this.debugResults
      );
    },
    deleteGuild: function() {
      Requester.delete("guild/" + this.guild._id).then(this.debugResults);
    },
    create: function() {
      Requester.post("guild/create", {
        name: this.newGuildName
      }).then(this.debugResults);
    }
  }
};
</script>

<style>
.guildName {
  font-weight: bold;
}
</style>
