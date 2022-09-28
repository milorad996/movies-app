<template>
  <NavBarComponent/>
  
  <router-view/>
</template>


<script>
import store from './store/store'
import NavBarComponent from './components/NavBarComponent.vue';
  export default {
       data() {
          return {
               isAuthenticated : false,
          }
       },
       components: {
    NavBarComponent,

},
       methods: {
        activeUser(){
          setTimeout(() => {
            console.log("ppppppppppppp", store.getters.getActiveUser )
            console.log("get tokennnnnnn", store.state.token)
          }, 3000);
        }
       },
       computed: {
        getActiveUser() {
        
            console.log("ppppppppppppp", store.state.activeUser )

          
          
          return store.getters.getActiveUser
        }
       }
      
       


       
  }
  </script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold; 
  color: #2c3e50;
}

 nav a.router-link-exact-active {
  color: #42b983;
}
</style>
