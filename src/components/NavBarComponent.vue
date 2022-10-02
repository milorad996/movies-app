<template>
  
  <section class="stage">
    <div id="home" class="div" v-if="isAuthenticatedComputed">
      <p id="homep" class="p">
        <router-link to="/all-movies">All Movies</router-link>
      </p>
    </div>
    <div class="div" id="about" v-if="isAuthenticatedComputed">
      <p class="p">
        <router-link to="/create-movie">Create Movie</router-link>
      </p>
    </div>
    <div class="div" id="contact" v-if="!isAuthenticatedComputed">
      <p class="p"><router-link to="/register">Register</router-link></p>
    </div>
    <div class="div" id="gallery" v-if="!isAuthenticatedComputed">
      <p class="p"><router-link to="/login">Login</router-link></p>
    </div>
    <div class="div" id="gallery" v-if="isAuthenticatedComputed">
      <p class="p" @click="handleLogout">Logout</p>
    </div>
  </section>
</template>

<script>
import store from "@/store/store";
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    handleLogout() {
      store.dispatch("logout");
      this.isAuthenticatedComputed = false;
    },
  },
  computed: {
    isAuthenticatedComputed() {
      console.log("IsAciteUser", store.getters.isAuthenticated);
      return store.getters.isAuthenticated;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.stage {
  height: 350px;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
}
.p {
  font-size: 35px;
  text-align: center;
  margin-top: 0;
  cursor: pointer;
  width: 100%;
  background: #78fed6;
  border-radius: 10px;
  font-family: Century Gothic;
  letter-spacing: 5px;
}
.div {
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  width: 300px;
  height: 40px;
  margin-top: 4%;
  transition-duration: 0.2s;
}
.p:hover {
  background: white;
  color: black;
}
.div:nth-child(odd) {
  transform: perspective(300px) rotateY(45deg);
  box-shadow: -2px 2px 7px gray;
}
.div:nth-child(even) {
  transform: perspective(300px) rotateY(-45deg);
  box-shadow: 2px 2px 7px gray;
}
.div:hover {
  transform: rotateY(0);
  background: white;
  color: black;
  box-shadow: 0px 0px 0px;
}
body {
  background-image: url("https://as2.ftcdn.net/v2/jpg/01/54/76/07/1000_F_154760711_C3jq59wTGrNVmIyB8DI54qkdlP6QBxZD.jpg");
  background-color: #cccccc;
  background-size: 100% 100%;
}
</style>
