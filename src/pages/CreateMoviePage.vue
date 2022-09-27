<template>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input text="text" required v-model="movie.Title" />
    <label>Description:</label>
    <input text="text" required v-model="movie.description" />
    <label>Image:</label>
    <input text="text" required v-model="movie.image" />
    
    <select v-model="movie.genre">
    <option disabled value="">Please select one</option>
    <option>Action</option>
    <option>Adventure</option>
    <option>Comedy</option>
    <option>Drama</option>
    <option>Fantasy</option>
    <option>Horror</option>
    <option>Musicals</option>
    <option>Mystery</option>
    <option>Romance</option>
    <option>Thriller</option>


    </select>

    <div class="submit">
      <button>Create</button>
    </div>
  </form>
</template>

<script>
export default {
     data() {
        return {
             movie: {},
        }
     },
     methods: {
        handleSubmit() {
            console.log(this.movie)
        }
     }
     
}
</script>

<style>
select {
    background: lightgray;
    font-weight: bold;
    font-size: 20px;
    color: black;
    margin-top: 10px;
}
    </style>