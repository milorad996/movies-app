<template>
  <SidebarSingleMoviePage  :genre="movie?.genre?.genre"/>
  <div class="card">
    <img :src="movie?.image" alt="Avatar" style="width: 100%" />
    <div class="container">
      <h4>
        <b>Title: {{ movie?.title }}</b>
      </h4>
      <div>
        <h3>Genre: {{ movie?.genre?.genre }}</h3>
      </div>
      <p>Description: {{ movie?.description }}</p>
      <h3>Review: {{ movie?.review }}</h3>
      <br />
      <div
            v-if="
              movie?.watchlists.find(
                (element) => element.user_id == userId && element.watched == 1
              )
            "
          >
            <button class="button-53" role="button">
              The movie was watched
            </button>
          </div>
      <h2 class="comments">Comments:</h2>
      <div v-for="comment in comments" :key="comment.id">
      <p>{{comment.content}}</p>
      </div>
      <CommentsPaginationComponent @loadMore="loadMore"/>

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
import CommentsPaginationComponent from "../../../components/CommentsPaginationComponent.vue";
import SidebarSingleMoviePage from "@/components/SidebarSingleMoviePage.vue";
import store from '@/store/store';
export default {
    components: {
    CommentsPaginationComponent,
    SidebarSingleMoviePage
},
    data() {
        return {
            id: null,
            comment: {},
            current_page: 1,
            userId: store.getters?.getActiveUser?.id,
        };
    },
    watch: {
		$route (to ){
        this.id = to.params.id;
        moviesStore.dispatch("getMovie", to.params.id);
        moviesStore.dispatch("getComments", to.params.id);
        moviesStore.dispatch("getMoviesByGenre",this.movie?.genre?.genre )
		}
	},
    methods: {
        addComment() {
            console.log("Add comment", this.comment, this.id);
            moviesStore.dispatch("addComment", { comment: this.comment, id: this.id });
        },
        loadMore(){
          console.log("Load more")
          this.current_page++;
          moviesStore.dispatch("getComments",{id : this.id, page : this.current_page})
        }
    },
    mounted() {
        const route = useRoute();
        this.id = route.params.id;
        moviesStore.dispatch("getMovie", route.params.id);
        moviesStore.dispatch("getComments", route.params.id);
        moviesStore.dispatch("getMoviesByGenre",this.movie?.genre?.genre )
    },
    computed: {
        movie() {
          console.log("Last page in single movie" ,moviesStore.getters.getComment.last_page)

            return moviesStore.getters.getMovie;
        },
        comments() {
            console.log("Comments in SingleMoviePage", moviesStore.getters.getComment);
            return moviesStore.getters.getComment.data;
        },
        last_page_comments(){
          console.log("Last page in single movie" ,moviesStore.getters.getComment)
          return moviesStore.getters.getComment;
        }
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
.button-53 {
  background-color: #3DD1E7;
  border: 0 solid #E5E7EB;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-53:focus {
  outline: 0;
}

.button-53:after {
  content: '';
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

.button-53:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  .button-53 {
    padding: .75rem 3rem;
    font-size: 1.25rem;
  }
}
</style>
