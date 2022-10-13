<template>
  <form @submit.prevent="handleOMDB">
    <label>Create a Movie By OMDB Title:</label>
    <input text="text" v-model="titleKey" />
    <button>Add OMDB Title</button>
  </form>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input text="text" required v-model="genre.movies.title" />
    <label>Description:</label>
    <input text="text" required v-model="genre.movies.description" />
    <label>Image:</label>
    <input text="text" required v-model="genre.movies.image" />

    <select v-model="genre.genre">
      <option disabled value="">Please select one</option>
      <option>Action</option>
      <option>Adventure</option>
      <option>Comedy</option>
      <option>Drama</option>
      <option>Fantasy</option>
      <option>Horror</option>
      <option>Musicals</option>
      <option>Mystery</option>
      <option>Romance</option>
      <option>Thriller</option>
    </select>

    <div class="submit">
      <button>Create</button>
    </div>
  </form>
</template>

<script>
import OmdbService from "@/services/OmdbService";
import moviesStore from "@/store/moviesStore";
export default {
  data() {
    return {
      genre: {
        movies: {},
      },
      titleKey: "",
      moviesList: {},
    };
  },
  methods: {
    handleSubmit() {
      moviesStore.dispatch("createMovie", this.genre);
    },
    async handleOMDB() {
      
      const data = await OmdbService.getOmdbDataByTitle(this.titleKey);
      this.moviesList = data;

      this.genre.movies.title = this.moviesList.Title;
      this.genre.movies.description = this.moviesList.Plot;
      this.genre.movies.image = this.moviesList.Poster;
      this.genre.genre = this.moviesList.Genre;

      await moviesStore.dispatch("createMovie", this.genre);
    },
  },
};
</script>

<style>
select {
  background: lightgray;
  font-weight: bold;
  font-size: 20px;
  color: black;
  margin-top: 10px;
}
</style>
