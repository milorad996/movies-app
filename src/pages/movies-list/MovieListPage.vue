<template>
  <SearchComponent @search="search" />
  <FilterComponent @filter="filter" />
  <SidebarComponent />
  <h1 class="allMovies">All movies</h1>

  <div class="cards">
    <div>
      <div class="card" v-for="movie in movies" :key="movie">
        <img :src="movie?.image" alt="Avatar" style="width: 100%" />
        <div class="container">
          <h4>
            <b
              >Title:
              <router-link :to="'/movies/' + movie?.id">
                {{ movie?.title }}</router-link
              >
            </b>
          </h4>
          <h3>Genre: {{ movie?.genre?.genre }}</h3>
          <p>Description: {{ movie?.description }}</p>
          <div
            v-if="
              movie?.watchlists.find(
                (element) => element.user_id == userId && element.watched == 1
              )
            "
          >
            <button class="button-53" role="button">
              The movie was watched
            </button>
          </div>
          <div
            v-if="
              movie?.watchlists?.length == 0 ||
              !movie?.watchlists?.find((element) => element.user_id == userId)
            "
          >
            <button @click="addToWatchList(movie?.id)" class="watchListButton">
              Add to watchlist
            </button>
          </div>
          <div
            v-if="
              movie?.watchlists?.find((element) => element.user_id == userId)
            "
          >
            <button
              @click="removeFromWatchlist(movie?.id)"
              class="deleteWatchlist"
            >
              Remove from watchlist
            </button>
          </div>
          <button @click="like(movie?.id)" class="likeButton">
            Like {{ movie?.likes?.length }}
          </button>
          <button @click="dislike(movie?.id)" class="dislikeButton">
            Dislike {{ movie?.dislikes?.length }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="lengthMovie >= 10">
      <div v-if="current_page != last_page">
        <PaginationComponent @loadMore="loadMore" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";
import moviesStore from "@/store/moviesStore";
import PaginationComponent from "@/components/PaginationComponent.vue";
import FilterComponent from "@/components/FilterComponent.vue";
import SidebarComponent from "../../components/SidebarComponent.vue";
import store from "@/store/store";
export default {
  data() {
    return {
      current_page: 1,
      search_term: "",
      filter_term: "",
      userId: store.getters?.getActiveUser?.id,
    };
  },
  components: {
    PaginationComponent,
    SearchComponent,
    FilterComponent,
    SidebarComponent,
  },
  computed: {
    movies() {
      return moviesStore.getters.getMovies.data;
    },
    lengthMovie() {
      return moviesStore.getters.getMovies.data?.length;
    },
    last_page() {
      return moviesStore.getters.getMovies.last_page;
    },
    movies_genres() {
      return moviesStore.getters.getMovies;
    },
    watchlistMovies() {
      return moviesStore.getters.getWatchlist;
    },
  },
  methods: {
    loadMore() {
      if (this.search_term) {
        this.current_page++;

        moviesStore.dispatch("searchByTerm", {
          search_term: this.search_term,
          current_page: this.current_page,
        });
      } else if (this.filter_term) {
        this.current_page++;
        moviesStore.dispatch("filterByTerm", {
          filter_term: this.filter_term,
          current_page: this.current_page,
        });
      } else {
        this.current_page++;
        moviesStore.dispatch("allMovies", this.current_page);
      }
    },
    search(term) {
      this.search_term = term;

      // moviesStore.dispatch("searchByTerm", {
      //   search_term: this.search_term,
      //   current_page: this.current_page,
      // });
      moviesStore.dispatch("getMoviesByElasticsearch" ,{
        search_term: this.search_term,
        current_page: this.current_page,
      })
    },
    filter(term) {
      this.filter_term = term;
      moviesStore.dispatch("filterByTerm", {
        filter_term: this.filter_term,
        current_page: this.current_page,
      });
    },
    like(id) {
      moviesStore.dispatch("createLike", { like: 1, movieId: id });
    },
    dislike(id) {
      moviesStore.dispatch("createDislike", { dislike: 1, movieId: id });
    },
    addToWatchList(movieId) {
      moviesStore.dispatch("addToWatchList", {
        onWatchlist: true,
        id: movieId,
      });
    },
    removeFromWatchlist(movieId) {
      moviesStore.dispatch("removeFromWatchlist", movieId);
    },
  },

  mounted() {
    moviesStore.dispatch("allMovies", this.current_page);
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

.likeButton {
  background-color: white;
  color: blue;
  font-weight: bold;
  border: 2px solid blue;
}

.likeButton:hover {
  background-color: blue;
  color: white;
}
.dislikeButton {
  background-color: white;
  color: red;
  font-weight: bold;
  border: 2px solid red;
}
.dislikeButton:hover {
  background-color: red;
  color: white;
}
.watchListButton {
  background-color: white;
  color: blue;
  font-weight: bold;
  border: 2px solid blue;
}
.watchListButton:hover {
  background-color: blue;
  color: white;
}
.deleteWatchlist {
  background-color: white;
  color: red;
  font-weight: bold;
  border: 2px solid red;
}
.deleteWatchlist:hover {
  background-color: red;
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
