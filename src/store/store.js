import {createStore} from 'vuex'

import AuthService from '../services/AuthService';
import router from '@/router';





export default createStore({
    state: {
        token: localStorage.getItem("token"),
        user: null,
        errors: null,
        
    },
    
    getters: {
        getErrors(state)  {
            return state.errors
        }
       
        
        
    },
    
    mutations: {
    
       SET_DATA(state,{user}){
        console.log("SET DATA", {user})
        state.user = user,
        state.errors = null
       },
       SET_ERRORS(state,errors){
        console.log("SET_ERRORS", errors)
        state.errors = errors;
       }
    },

    actions: {
        async register({commit},user){
            console.log("User inside register",user)
           try{
            commit("SET_DATA", await AuthService.register(user))
            router.push({name: "home"});
           }catch(e){
            
            console.log("Error inside catch:" ,e);
            commit("SET_ERRORS",e)
           }
        }
    }

})