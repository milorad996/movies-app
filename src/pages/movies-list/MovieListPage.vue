<template>
  <h1>All movies</h1>
  <div class="card" v-for="movie in movies" :key="movie.id">
  <img :src="movie?.image" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>Title: <router-link :to="'/movies/' + movie.id"> {{movie?.title}}</router-link> </b></h4>
    <h3>Genre: {{movie?.genre}}</h3>
    <p>Description: {{movie?.description}}</p>
  </div>
</div>
  
</template>

<script>
import moviesStore from '@/store/moviesStore'
export default {
    data(){
      return {

      }
    },
    computed: {
      movies() {
        console.log("Movies in movie list",moviesStore.getters.getMovies.data )
         return moviesStore.getters.getMovies
      }
    },
    mounted(){
      moviesStore.dispatch("allMovies")
    }
    
}
</script>

<style>
h1{
  margin-top: 2px;
  margin-bottom: 50px;
  color: aquamarine;
  font-size: 60px;
}
.card {
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  background: white;
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: 5px 5px greenyellow;

}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
  
}
</style>