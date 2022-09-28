<template>
    <div class="card">
  <img :src="movie?.image" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>Title: {{movie?.title}}</b></h4>
    <h3>Genre: {{movie?.genre}}</h3>
    <p>Description: {{movie?.description}}</p>
  </div>
  </div>
</template>

<script>
import moviesStore from '@/store/moviesStore';
import { useRoute } from 'vue-router'
export default {
    data(){
        return {
            id: null
        }
    },
    methods:{
      
    },
    mounted(){
        const route = useRoute();
            console.log("Show id", route.params.id)
            this.id = route.params.id

        moviesStore.dispatch("getMovie",route.params.id)
    },
    computed: {
        movie() {
            console.log("Movie in SingleMoviePage", moviesStore.getters.getMovie)
            return moviesStore.getters.getMovie
        }
    }
    
}
</script>

<style>

</style>