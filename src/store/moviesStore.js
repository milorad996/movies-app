import router from "@/router";
import CommentService from "@/services/CommentService";
import LikeDislikeService from "@/services/LikeDislikeService";
import MovieService from "@/services/MovieService";
import { createStore } from "vuex";

export default createStore({
  state: {
    movies: [],
    movie: null,
    comments: [],
    popularMovies: [],
    moviesByGenre: [],
    watchlist: []
  },

  getters: {
    getMovies(state) {
      return state.movies;
    },
    getMovie(state) {
      return state.movie;
    },
    getComment(state){
      return state.comments;
    },
    getPopularMovies(state){
      return state.popularMovies
    },
    getMoviesByGenre(state){
      console.log("state.moviesByGenre", state.moviesByGenre)
      return state.moviesByGenre
    },
    getWatchlist(state){
      console.log("getters watchlist", state.watchlist)
      return state.watchlist;
    }
    
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
    },
    SET_MOVIES_BY_LIKE(state,movies){
      state.movies.data = movies;
    },
    SET_MOVIES_BY_DISLIKE(state,movies){
      state.movies.data = movies;
    },
    SET_COMMENTS(state,comments){
      console.log("Comments in setComments",comments);
      state.comments = comments;
    },
    APPEND_COMMENTS(state,comments){
      state.comments.data = state.comments.data.concat(comments.data);
    },
    SET_POPULAR_MOVIES(state,movies){
      state.popularMovies = movies
    },
    SET_MOVIES_BY_GENRE(state,movies){
      console.log("set movies by genre", movies)
      state.moviesByGenre = movies
    },
    SET_WATCHLIST(state,movies){
      state.watchlist = movies;
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
        console.log("Movies filter" ,movies.data)
        if (payload.current_page > 1) {
          commit("APPEND_MOVIES", movies.data);
        } else {
          console.log("Movies filter" ,movies.data)

          commit("SET_MOVIES_BY_FILTER",movies.data);
  
        }
      }catch(e){
        console.log(e);
      }
    },
    async createLike({commit}, payload){
      console.log("Create like",payload)
      try{
        const movies = await LikeDislikeService.createLike({"likes" : {"like": payload.like}},payload.movieId)
        console.log("Create like all movies", movies);
        console.log("all movies in createLike", this.state.movies.data[1].like_dislike)
        
    
        commit("SET_MOVIES_BY_LIKE",movies);
        //router.push({ name: "MovieListPage" });
      }catch(e){
        console.log(e);
      }
    },
    async createDislike({commit}, payload){
      console.log("Create like",payload)
      try{
        const movies = await LikeDislikeService.createDislike({"dislikes" : {"dislike": payload.dislike}},payload.movieId)
        console.log("Create dislike all movies", movies);
        

        commit("SET_MOVIES_BY_DISLIKE",movies);
        router.push({ name: "MovieListPage" });
      }catch(e){
        console.log(e);
      }
    },
    async addComment({commit},payload){
      console.log("Add comment payload" , payload)
      try{
        const comments = await CommentService.addComment(payload.comment,payload.id)
        console.log("Movie comment" ,comments);
        commit("SET_COMMENTS",comments)
      }catch(e){
        console.log(e);
      }
    },
    async getComments({commit},payload){
      console.log("Comments id in getComments",payload);
      try{
        const comments = await CommentService.getComments(payload.id,payload.page);
        console.log("Dobijeni comments acions",comments)
        if (payload.page > 1) {
          commit("APPEND_COMMENTS", comments);
        } else {
          commit("SET_COMMENTS", comments);
        }
      }catch(e){
        console.log(e);
      }
    },
    async getPopularMovies({commit}){
      try{
        const movies = await MovieService.getPopularMovies();
        console.log("Popular movies", movies)
        commit("SET_POPULAR_MOVIES", movies)
      }catch(e){
        console.log(e);
      }
    },
    async getMoviesByGenre({commit}, genre){
      console.log("genre store", genre)
      try{
        const movies = await MovieService.getMoviesByGenre(genre);
        console.log("Movies by genre", movies)
        commit("SET_MOVIES_BY_GENRE", movies);
      }catch(e){
        console.log(e);
      }
    },
    async getWatchlist({commit}){
      try{
        const movies = await MovieService.getWatchlist();
        console.log("Movie watchlist", movies);
        commit("SET_WATCHLIST", movies)
      }catch(e){
        console.log(e);
      }
    },
    async addToWatchList({commit}, payload){
      console.log("Payload addToWatchList", payload);
      try{
        const movies = await MovieService.addToWatchList({"onWatchlist" : payload.onWatchlist},payload.id)
        commit("SET_WATCHLIST",movies);
        router.push({name: "WatchList"})

      }catch(e){
        console.log(e);
      }
    },
    async removeFromWatchlist({commit},movieId){
      console.log("Remove movieId", movieId)
      try{
        const movies = await MovieService.removeFromWatchlist(movieId)
        commit("SET_WATCHLIST",movies)
        router.push({name: "WatchList"})


      }catch(e){
        console.log(e);
      }
    },
    async watched({commit},payload){
      try{
        const movies = await MovieService.watched({"watched" : payload.watched}, payload.watchlistId)
        commit("SET_WATCHLIST",movies);
        router.push({name: "WatchList"})
      }catch(e){
        console.log(e);
      }
    }
    
  },
  
 
});
