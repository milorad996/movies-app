<template>
  <SearchComponent  @search="search"/>
  <FilterComponent @filter="filter"/>
  <h1>All movies</h1>
  
  
  <div class="cards">
    
  <div class="card" v-for="movie in movies" :key="movie?.id">
  

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

      
   <button @click="like(movie?.id)"  class="likeButton">Like {{movie?.likes?.length}}</button>
   <button @click="dislike(movie?.id)" class="dislikeButton">Dislike {{movie?.dislikes?.length}}</button>
  
    </div>
    
  </div>
  <div v-if="lengthMovie >= 10">
  <div v-if="current_page != last_page" >
    <PaginationComponent @loadMore="loadMore" />
  </div>
</div>
</div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent.vue';
import moviesStore from "@/store/moviesStore";
import PaginationComponent from "@/components/PaginationComponent.vue";
import FilterComponent from '@/components/FilterComponent.vue';
export default {
  data() {
    return {
      current_page: 1,
      search_term: "",
      filter_term: "",
      
    };
  },
  components: {
    PaginationComponent,
    SearchComponent,
    FilterComponent
},
  computed: {
    movies() {
      console.log("Likes",moviesStore.getters.getMovie);

      console.log(
        "Movies in movie list",
        moviesStore.getters.getMovies.data
      );
      return moviesStore.getters.getMovies.data;
    },
    lengthMovie(){
      return moviesStore.getters.getMovies.data?.length
    },
    last_page() {
      return moviesStore.getters.getMovies.last_page;
    },
  
  },
  methods: {
    loadMore() {
      if(this.search_term) {
        this.current_page++;
        console.log("loeadmore searchTerm", !!this.search_term)
        console.log("current_page searchTerm", this.current_page)
    
        moviesStore.dispatch("searchByTerm",{search_term : this.search_term,current_page : this.current_page})
      }else if(this.filter_term){
        this.current_page++;
        moviesStore.dispatch("filterByTerm",{filter_term : this.filter_term,current_page : this.current_page})
      }else{
        this.current_page++;
        moviesStore.dispatch("allMovies", this.current_page);
      }
      
    },
    search(term){
      this.search_term = term;
      console.log("Searchtermee" ,this.search_term ,this.current_page)
      console.log("term",term)
      moviesStore.dispatch("searchByTerm",{search_term : this.search_term,current_page : this.current_page})
    },
    filter(term){
      this.filter_term = term;
      console.log("Dobijen filter term u filteru", this.filter_term)
      moviesStore.dispatch("filterByTerm",{filter_term : this.filter_term,current_page : this.current_page})
    },
    like(id){
      moviesStore.dispatch("createLike",{like: 1, movieId : id})
      console.log("Clicked like",id)
    },
    dislike(id){
      moviesStore.dispatch("createDislike",{dislike: 1, movieId : id})
    }
  },
 
  mounted() {
    moviesStore.dispatch("allMovies", this.current_page);
  },
};
</script>

<style>
h1 {
  margin-top: 2px;
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
.cards{
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
.dislikeButton{
  background-color: white; 
  color: red; 
  font-weight: bold;
  border: 2px solid red; 
}
.dislikeButton:hover {
  background-color: red;
  color: white;
}


</style>
