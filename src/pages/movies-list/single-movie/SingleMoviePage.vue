<template>
  <div class="card">
    <img :src="movie?.image" alt="Avatar" style="width: 100%" />
    <div class="container">
      <h4>
        <b>Title: {{ movie?.title }}</b>
      </h4>
      <div>
        <h3>Genre: {{ movie?.genre.genre }}</h3>
      </div>
      <p>Description: {{ movie?.description }}</p>
      <h3>Review: {{ movie?.review }}</h3>
      <br />
      <h2 class="comments">Comments:</h2>
      <div v-for="comment in movie?.comments" :key="comment?.id">
       <p>{{comment?.content}}</p>
      </div>
      <form @submit.prevent="addComment">
        <p><label for="w3review">Leave a comment:</label></p>
        <textarea required id="w3review" v-model="comment.content" name="w3review" rows="4" cols="50" style="width: 318px; height: 106px;" >
        </textarea
        >
        <br />
        <input class="submitAddComment" type="submit" value="Add" />
      </form>
    </div>
  </div>
</template>

<script>
import moviesStore from "@/store/moviesStore";
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      id: null,
      comment: {}
    };
  },
  methods: {
    addComment(){
      console.log("Add comment",this.comment, this.id);
      moviesStore.dispatch("addComment",{comment: this.comment,id : this.id})
    }
  },
  mounted() {
    const route = useRoute();
    console.log("Show id", route.params.id);
    this.id = route.params.id;

    moviesStore.dispatch("getMovie", route.params.id);
  },
  computed: {
    movie() {
      console.log("Movie in SingleMoviePage", moviesStore.getters.getMovie);
      return moviesStore.getters.getMovie;
    },
  },
};
</script>

<style scoped>
.card {
  justify-content: center;
  margin: auto;
  margin-bottom: 200px;
  display: inline-table;
}
.comments {
  text-align: left;
}
.submitAddComment{
  background: lightgreen;
  font-size: 24px;
  color: white;
}
.submitAddComment:hover {background-color: #3e8e41}

.submitAddComment:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
