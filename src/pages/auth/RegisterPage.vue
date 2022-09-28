<template>
  <form @submit.prevent="handleSubmit">
    <label>First Name:</label>
    <input text="text" required v-model="user.first_name" />
    <label>Last Name:</label>
    <input text="email" required v-model="user.last_name" />
    <label>Email:</label>
    <input text="email" required v-model="user.email" />
    <div v-if="getErrors?.response?.data.errors.email[0]">
      {{getErrors?.response?.data.errors?.email[0]}}

    </div>

    <label>Password:</label>
    <input type="password" required v-model="user.password" />
    <label>Confirm Password:</label>
    <input type="password" required v-model="user.password_confirmation" />
    <div class="terms">
      <input type="checkbox" required v-model="user.terms_of_service" />
      <label>Accept terms and condition</label>
    </div>
    <div class="submit">
      <button>Create an Account</button>
    </div>
  </form>
  
</template>

<script>
import store from '@/store/store';
import {mapActions,  } from 'vuex';
export default {
  
    data()  {
        return  {
            user: { },
            errors: null
        }
    },
  
    methods: {
      ...mapActions(['register']),
      handleSubmit(){
        
        
          store.dispatch("register",this.user)
        

      }
    },
    computed: {
      
          getErrors() {
            return store.getters.getErrors
          },

      
      
      
    },
    
    
}
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}
</style>
