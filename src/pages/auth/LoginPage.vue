<template>
   <form @submit.prevent="handleSubmit">
    <label>Email:</label>
    <input text="email" required v-model="user.email" />
    <div v-if="getErrors?.response?.data.errors.email[0]">
      {{getErrors?.response?.data.errors?.email[0]}}

    </div>

    <label>Password:</label>
    <input type="password" required v-model="user.password" />
    
    <div class="submit">
      <button>Sign in</button>
    </div>
  </form>
</template>

<script>
import store from '@/store/store'
export default {
    data() {
        return {
            user: {},
        }
    },
    methods: {
        handleSubmit(){
            store.dispatch("login",this.user)
        }
    },
    computed: {
        getErrors() {
            console.log('Errorssssss',store.getters.getErrors)
            return store.getters.getErrors
          },
    }
    
}
</script>

<style>

</style>