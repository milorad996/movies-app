import router from "@/router";
import CommentService from "@/services/CommentService";
import ImageService from "@/services/ImageService";
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
    watchlist: [],
  },

  getters: {
    getMovies(state) {
      return state.movies;
    },
    getMovie(state) {
      return state.movie;
    },
    getComment(state) {
      return state.comments;
    },
    getPopularMovies(state) {
      return state.popularMovies;
    },
    getMoviesByGenre(state) {
      return state.moviesByGenre;
    },
    getWatchlist(state) {
      return state.watchlist;
    },
  },

  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_MOVIE(state, movie) {
      state.movie = movie;
    },
    APPEND_MOVIES(state, movies) {
      state.movies.data = state.movies.data.concat(movies.data);
    },
    ADD_MOVIE(state, movie) {
      state.movies.data.push(movie);
    },
    SET_MOVIES_BY_SEARCH(state, movies) {
      state.movies.data = movies;
    },
    SET_MOVIES_BY_FILTER(state, movies) {
      state.movies.data = movies;
    },
    SET_MOVIES_BY_LIKE(state, movies) {
      state.movies.data = movies;
    },
    SET_MOVIES_BY_DISLIKE(state, movies) {
      state.movies.data = movies;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    APPEND_COMMENTS(state, comments) {
      state.comments.data = state.comments.data.concat(comments.data);
    },
    SET_POPULAR_MOVIES(state, movies) {
      state.popularMovies = movies;
    },
    SET_MOVIES_BY_GENRE(state, movies) {
      state.moviesByGenre = movies;
    },
    SET_WATCHLIST(state, movies) {
      state.watchlist = movies;
    },
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
    async createMovie({ commit }, newMovie) {
      try {
        const movie = await MovieService.createMovie(newMovie);
        commit("ADD_MOVIE", movie);
        router.push({ name: "MovieListPage" });
      } catch (e) {
        console.log("Error add movie", e);
      }
    },
    async searchByTerm({ commit }, payload) {
      try {
        const movies = await MovieService.searchByTerm(
          payload.search_term.title,
          payload.current_page
        );
        if (payload.current_page > 1) {
          commit("APPEND_MOVIES", movies.movies);
        } else {
          commit("SET_MOVIES_BY_SEARCH", movies.movies.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async filterByTerm({ commit }, payload) {
      try {
        const movies = await MovieService.filterByTerm(
          payload.filter_term.genre,
          payload.current_page
        );
        if (payload.current_page > 1) {
          commit("APPEND_MOVIES", movies.movies);
        } else {
          commit("SET_MOVIES_BY_FILTER", movies.movies.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async createLike({ commit }, payload) {
      try {
        const movies = await LikeDislikeService.createLike(
          { likes: { like: payload.like } },
          payload.movieId
        );

        commit("SET_MOVIES_BY_LIKE", movies);
      } catch (e) {
        console.log(e);
      }
    },
    async createDislike({ commit }, payload) {
      try {
        const movies = await LikeDislikeService.createDislike(
          { dislikes: { dislike: payload.dislike } },
          payload.movieId
        );

        commit("SET_MOVIES_BY_DISLIKE", movies);
        router.push({ name: "MovieListPage" });
      } catch (e) {
        console.log(e);
      }
    },
    async addComment({ commit }, payload) {
      try {
        const comments = await CommentService.addComment(
          payload.comment,
          payload.id
        );
      
        commit("SET_COMMENTS", comments);
      
      } catch (e) {
        console.log(e);
      }
    },
    async getComments({ commit }, payload) {
      try {
        const comments = await CommentService.getComments(
          payload.id,
          payload.page
        );
        if (payload.page > 1) {
          commit("APPEND_COMMENTS", comments);
        } else {
          commit("SET_COMMENTS", comments);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getPopularMovies({ commit }) {
      try {
        const movies = await MovieService.getPopularMovies();
        commit("SET_POPULAR_MOVIES", movies);
      } catch (e) {
        console.log(e);
      }
    },
    async getMoviesByGenre({ commit }, genre) {
      try {
        const movies = await MovieService.getMoviesByGenre(genre);
        commit("SET_MOVIES_BY_GENRE", movies);
      } catch (e) {
        console.log(e);
      }
    },
    async getWatchlist({ commit }) {
      try {
        const movies = await MovieService.getWatchlist();
        commit("SET_WATCHLIST", movies);
      } catch (e) {
        console.log(e);
      }
    },
    async addToWatchList({ commit }, payload) {
      try {
        const movies = await MovieService.addToWatchList(
          { onWatchlist: payload.onWatchlist },
          payload.id
        );
        commit("SET_WATCHLIST", movies);
        router.push({ name: "WatchList" });
      } catch (e) {
        console.log(e);
      }
    },
    async removeFromWatchlist({ commit }, movieId) {
      try {
        const movies = await MovieService.removeFromWatchlist(movieId);
        commit("SET_WATCHLIST", movies);
        router.push({ name: "WatchList" });
      } catch (e) {
        console.log(e);
      }
    },
    async watched({ commit }, payload) {
      try {
        const movies = await MovieService.watched(
          { watched: payload.watched },
          payload.watchlistId
        );
        commit("SET_WATCHLIST", movies);
        router.push({ name: "WatchList" });
      } catch (e) {
        console.log(e);
      }
    },
    async getMoviesByElasticsearch({ commit }, payload) {
      try {
        const movies = await MovieService.getMoviesByElasticsearch(
          payload.search_term.title,
          payload.current_page
        );
        if (payload.current_page > 1) {
          commit("APPEND_MOVIES", movies.movies);
        } else {
          commit("SET_MOVIES_BY_SEARCH", movies.movies);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async uploadImage({ commit }, fromData) {
    
      try {
        await ImageService.uploadImage(fromData);
      
        commit("SET_MOVIES", this.state.movies);
      
      } catch (e) {
        console.log(e);
      }
    },
  },
});
