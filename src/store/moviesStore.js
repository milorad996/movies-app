import router from "@/router";
import MovieService from "@/services/MovieService";
import { createStore } from "vuex";

export default createStore({
  state: {
    movies: [],
    movie: null,
  },

  getters: {
    getMovies(state) {
      return state.movies;
    },
    getMovie(state) {
      return state.movie;
    },
  },

  mutations: {
    SET_MOVIES(state, movies) {
      console.log("All movies", movies);
      state.movies = movies;
    },
    SET_MOVIE(state, movie) {
      console.log("Single movie", movie);
      state.movie = movie;
    },
    APPEND_MOVIES(state, movies) {
      console.log("Apendovani muvi", movies);
     state.movies.data = state.movies.data.concat(movies.data)
    },
    ADD_MOVIE(state,movie){
        console.log("Dobijen movie", movie)
        state.movies.data.push(movie)
    }
  },

  actions: {
    async allMovies({ commit }, page) {
      try {
        const movies = await MovieService.getAll(page);
        if (page > 1) {
          commit("APPEND_MOVIES", movies);
        } else {
          commit("SET_MOVIES", movies);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getMovie({ commit }, id) {
      try {
        const movie = await MovieService.get(id);
        commit("SET_MOVIE", movie);
      } catch (e) {
        console.log(e);
      }
    },
    async createMovie({commit}, newMovie){
        try{
            const movie = await MovieService.createMovie(newMovie);
            commit("ADD_MOVIE",movie)       
            router.push({ name: "MovieListPage" });
        }catch(e){
            console.log("Error add movie" , e)
        }
    }
  },
});