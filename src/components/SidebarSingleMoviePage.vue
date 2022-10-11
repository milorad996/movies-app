<template>
    <nav>
        
        <div>
            <h3>Top 10 {{moviesByGenre[0]?.genre?.genre}} Movies</h3>
            <router-link  :to="'/movies/' + moviesByGenre[0]?.id">
            {{ moviesByGenre[0]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[1]?.id">
            {{ moviesByGenre[1]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[2]?.id">
            {{ moviesByGenre[2]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[3]?.id">
            {{ moviesByGenre[3]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[4]?.id">
            {{ moviesByGenre[4]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[5]?.id">
            {{ moviesByGenre[5]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[6]?.id">
            {{ moviesByGenre[6]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[7]?.id">
            {{ moviesByGenre[7]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[8]?.id">
            {{ moviesByGenre[8]?.title }}</router-link
          >
          <router-link :to="'/movies/' + moviesByGenre[9]?.id">
            {{ moviesByGenre[9]?.title }}</router-link
          >
        </div>

    </nav>

</template>

<script>
import moviesStore from '@/store/moviesStore'
export default {
	props: ['genre'],
    data() {
        return {

        }
    },
	
    mounted(){
	
    },
	methods: {
		
	},
	computed: {
		moviesByGenre(){
			return moviesStore.getters.getMoviesByGenre
		}
	}

}
</script>

<style scoped>
body
{
	font-family: sans-serif;
	font-size: 100%;
	padding: 0;
	margin: 0;
	color: #333;
	background-color: #222;
}


article
{
	position: fixed;
	width: 70%;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	padding: 30px 15%;
	background-color: rgb(202, 19, 19);
	overflow: auto;
	z-index: 0;
	-webkit-transform-origin: 0 50%;
	-moz-transform-origin: 0 50%;
	-ms-transform-origin: 0 50%;
	-o-transform-origin: 0 50%;
	transform-origin: 0 50%;
}


article:after
{
	position: absolute;
	content: ' ';
	left: 100%;
	top: 0;
	right: 0;
	bottom: 0;

}


nav
{
	position: fixed;
	left: -16em;
	top: 0;
	bottom: 0;
  background-color: black;

	border-right: 50px solid black;
	box-shadow: 4px 0 5px rgba(0,0,0,0.2);
	z-index: 1;
	cursor: pointer;
}

nav:after
{
	position: absolute;
	content: ' ';
	width: 0;
	height: 0;
	right: -70px;
	top: 50%;
	border-width: 15px 10px;
	border-style: solid;
	border-color: transparent transparent transparent black;
}

nav div
{
	width: 14em;
	list-style-type: none;
	margin: 0;
	padding: 1em;
}

nav a:link, nav div:visited
{
	display: block;
	width: 100%;
	font-weight: bold;
	line-height: 2.5em;
	text-indent: 10px;
	text-decoration: none;
	color: blue;
	border-radius: 4px;
	outline: 0 none;
}

nav a:hover, nav a:focus
{
	color: #fff;
	background-color: darken(#c3ff00, 20%);
	text-shadow: 0 0 4px #fff;
	box-shadow: inset 0 2px 2px rgba(252, 0, 0, 0.904);
}


article, article:after, nav, nav *
{
	-webkit-transition: all 600ms ease;
	-moz-transition: all 600ms ease;
	-ms-transition: all 600ms ease;
	-o-transition: all 600ms ease;
	transition: all 600ms ease;
}

nav:hover
{
	left: 0;
}

nav:hover ~ article
{
	-webkit-transform: translateX(16em) perspective(600px) rotateY(10deg);
	-moz-transform: translateX(16em) perspective(600px) rotateY(10deg);
	-ms-transform: translateX(16em) perspective(600px) rotateY(10deg);
	-o-transform: translateX(16em) perspective(600px) rotateY(10deg);
	transform: translateX(16em) perspective(600px) rotateY(10deg);
}

nav:hover ~ article:after
{
	left: 60%;
}


footer
{
	margin-top: 2em;
	border-top: 1px dotted #999;
}

h1
{
	font-size: 2.5em;
	font-weight: normal;
	margin: 0 0 0.2em 0;
}

p
{
	line-height: 1.3em;
	margin: 0 0 1.5m 0;
}

.lead {
  font-weight:100;
  font-size:21px;
}

picture {
  width:100%;
  height:auto;
  display:block;
}
</style>