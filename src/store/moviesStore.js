import router from "@/router";
import LikeService from "@/services/LikeService";
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
      state.movies.data = state.movies.data.concat(movies.data);
    },
    ADD_MOVIE(state, movie) {
      console.log("Dobijen movie", movie);
      state.movies.data.push(movie);
    },
    SET_MOVIES_BY_SEARCH(state,movies){
      console.log("Search movie", movies);
      state.movies.data = movies;
    },
    SET_MOVIES_BY_FILTER(state,movies){
      console.log("Movies set filter",movies)
      state.movies.data = movies;
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
        console.log(movie);
      } catch (e) {
        console.log(e);
      }
    },
    async createMovie({ commit }, newMovie) {
      try {
        const movie = await MovieService.createMovie(newMovie);
        commit("ADD_MOVIE", movie);
        router.push({ name: "MovieListPage" });
      } catch (e) {
        console.log("Error add movie", e);
      }
    },
    async searchByTerm({commit},payload) {
    
      try{
        const movies = await MovieService.searchByTerm(payload.search_term.title,payload.current_page);
        if (payload.current_page > 1) {
          commit("APPEND_MOVIES", movies.movies);
        } else {
          commit("SET_MOVIES_BY_SEARCH",movies.movies.data);

        }
        
        
      }catch(e){
        console.log(e);
      }
    },
    async filterByTerm({commit},payload){
      console.log("Payload in filter" ,payload)
      try{
        const movies = await MovieService.filterByTerm(payload.filter_term.genre,payload.current_page);
        console.log("Movies filter" ,movies.genre.data)
        if (payload.current_page > 1) {
          commit("APPEND_MOVIES", movies.genre.data);
        } else {
          commit("SET_MOVIES_BY_FILTER",movies.genre.data);
  
        }
      }catch(e){
        console.log(e);
      }
    },
    async createLike({commit}, payload){
      console.log("Create like",payload)
      try{
        const movie = await LikeService.createLike({"likeDislike" : {"like": payload.like}},payload.movieId)
        console.log("Create like all movies", movie);
        commit("SET_MOVIE",movie);
        router.push({ name: "MovieListPage" });
      }catch(e){
        console.log(e);
      }
    },
    async createDislike({commit}, payload){
      console.log("Create like",payload)
      try{
        const movie = await LikeService.createDislike({"likeDislike" : {"dislike": payload.dislike}},payload.movieId)
        console.log("Create dislike all movies", movie);
        commit("SET_MOVIE",movie);
        router.push({ name: "MovieListPage" });
      }catch(e){
        console.log(e);
      }
    }
    
  },
  
 
});
