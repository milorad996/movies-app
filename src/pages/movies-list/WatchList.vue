<template>
  <div>
    <div class="card" v-for="movie in watchlistMovies" :key="movie?.id">
      <img :src="movie?.movie?.image" alt="Avatar" style="width: 100%" />
      <div class="container">
        <h4>
          <b
            >Title:
            <router-link :to="'/movies/' + movie?.movie?.id">
              {{ movie?.movie?.title }}</router-link
            >
          </b>
        </h4>
        <h3>Genre: {{ movie?.movie?.genre?.genre }}</h3>
        <p>Description: {{ movie?.movie?.description }}</p>
        <div>
          <div v-if="!movie?.watched">
            <button @click="watched(movie?.id)" class="watched">Watched</button>
          </div>
          <div v-if="movie?.watched">
            <button class="button-53" role="button">
              The movie was watched
            </button>
          </div>
          <div v-if="movie?.user_id == id">
            <button
              @click="removeFromWatchlist(movie?.movie_id)"
              class="deleteWatchlist"
            >
              Remove from watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
import moviesStore from "@/store/moviesStore";
export default {
  data() {
    return {
      id: store.getters?.getActiveUser?.id,
    };
  },
  methods: {
    removeFromWatchlist(movieId) {
      moviesStore.dispatch("removeFromWatchlist", movieId);
    },
    watched(id) {
      console.log("Id watchlist", id);
      moviesStore.dispatch("watched", { watched: true, watchlistId: id });
    },
  },
  mounted() {
    moviesStore.dispatch("getWatchlist");
  },
  computed: {
    watchlistMovies() {
      return moviesStore.getters.getWatchlist;
    },
  },
};
</script>

<style>
h1 {
  margin-top: 20px;
  margin-bottom: 50px;
  color: aquamarine;
  font-size: 60px;
}
.card {
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  background: white;
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: 5px 5px greenyellow;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
.cards {
  margin-top: 200px;
}
.watched {
  background-color: white;
  color: blue;
  font-weight: bold;
  border: 2px solid blue;
}
.watched:hover {
  background-color: blue;
  color: white;
}
.button-53 {
  background-color: #3dd1e7;
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: auto;
}

.button-53:focus {
  outline: 0;
}

.button-53:after {
  content: "";
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

.button-53:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  .button-53 {
    padding: 0.75rem 3rem;
    font-size: 1.25rem;
  }
}
</style>
