import HttpService from "./HttpService";

class MovieService extends HttpService {
  getAll = async (page = null) => {
    if (page) {
      const { data } = await this.client.get(`/movies?page=${page}`);
      return data;
    }
    const { data } = await this.client.get("/movies");
    return data;
  };
  get = async (id) => {
    const { data } = await this.client.get(`movies/${id}`);
    return data;
  };
  createMovie = async (newMovie) => {
    const { data } = await this.client.post("/movies", newMovie);
    return data;
  };
  searchByTerm = async (searchTerm, page) => {
    const { data } = await this.client.get(
      `/movies-search?title=${searchTerm}&page=${page}`
    );
    return data;
  };
  filterByTerm = async (filterTerm, page) => {
    const { data } = await this.client.get(
      `/movies-filter?genre=${filterTerm}&page=${page}`
    );
    return data;
  };
  getPopularMovies = async () => {
    const { data } = await this.client.get("/popular");
    return data;
  };
  getMoviesByGenre = async (genre) => {
    const { data } = await this.client.get(`/genres?genre=${genre}`);
    return data;
  };
  getWatchlist = async () => {
    const { data } = await this.client.get("/lists");
    return data;
  };
  addToWatchList = async (onWatchlist, movieId) => {
    const { data } = await this.client.post(
      `/lists-movies/${movieId}`,
      onWatchlist
    );
    return data;
  };
  removeFromWatchlist = async (movieId) => {
    const { data } = await this.client.delete(`/lists-remove/${movieId}`);
    return data;
  };
  watched = async (watched, id) => {
    const { data } = await this.client.put(`/lists/${id}`, watched);
    return data;
  };
  getMoviesByElasticsearch = async (searchTerm,page = null) => {
    const { data } = await this.client.get(
      `/elastic-search?term=${searchTerm}&page=${page}`
    );
    return data;
  }
}

export default new MovieService();
