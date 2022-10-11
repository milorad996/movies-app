import { createStore } from "vuex";

import AuthService from "../services/AuthService";
import router from "@/router";

export default createStore({
  state: {
    token: localStorage.getItem("token"),
    user: null,
    errors: [],
    activeUser: null,
  },

  getters: {
    getErrors(state) {
      return state.errors;
    },
    getActiveUser(state) {
      return state.activeUser;
    },
    getToken(state) {
      return state.token;
    },
    isAuthenticated: (state) => !!state.token,
    getUser(state) {
      return state.user;
    },
  },

  mutations: {
    SET_DATA(state, { user }) {
      (state.user = user), (state.errors = null);
    },
    SET_ERRORS(state, errors) {
      state.errors = errors;
    },
    SET_ACTIVE_USER(state, user) {
      (state.activeUser = user), (state.errors = null);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_ACTIVE_USER_NULL(state) {
      (state.activeUser = null), (state.errors = null);
    },
  },

  actions: {
    async register({ commit }, user) {
      try {
        commit("SET_DATA", await AuthService.register(user));
        router.push({ name: "home" });
      } catch (e) {
        commit("SET_ERRORS", e);
      }
    },
    async login({ commit }, user) {
      try {
        const data = await AuthService.login(user);
        commit("SET_ACTIVE_USER", await AuthService.login(user));
        commit("SET_TOKEN", data.token);
        commit("SET_ACTIVE_USER", data.user);

        router.push({ name: "MovieListPage" });
      } catch (e) {
        commit("SET_ERRORS", e);
      }
    },
    async userProfile({ commit }) {
      try {
        commit("SET_ACTIVE_USER", await AuthService.getMyProfile());
      } catch (e) {
        console.log("Error", e);
      }
    },
    async logout({ commit }) {
      try {
        await AuthService.logout();
        localStorage.removeItem("token");
        commit("SET_TOKEN", null);
        commit("SET_ACTIVE_USER_NULL");
        router.push({ name: "LoginPage" });
        console.log("Successed logout");
      } catch (e) {
        console.log(e);
      }
    },
  },
});
