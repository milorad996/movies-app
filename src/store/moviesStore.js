import MovieService from '@/services/MovieService';
import {createStore} from 'vuex'






export default createStore({
    state: {
        movies: [],
    },
    
    getters: {
        getMovies(state)  {
            return state.movies
        },   


       
        
        
    },
    
    mutations: {
      SET_MOVIES(state,movies){
        console.log("All movies", movies)
        state.movies = movies;
      }
       
       
    },

    actions: {
        
        async allMovies({commit}){
            try{
                const movies = await MovieService.getAll();
                commit("SET_MOVIES",movies)
            }catch(e){
                console.log(e);
            }
        }


        
    }

})