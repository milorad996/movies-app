<template>
  <div id="cover">
  <form  action="" @submit.prevent="handleSearch">
    <div class="tb">
      <div class="td"><input type="text" v-model="term.title" placeholder="Search" required></div>
      <div class="td" id="s-cover">
        <button type="submit">
          <div id="s-circle"></div>
          <span></span>
        </button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
    data(){
        return {
            term: {}
        }
    },
    methods: {
        handleSearch(){
            console.log("Handle seacrh",this.term)
            this.$emit("search",this.term);
        }
    },
    
}
</script>

<style scoped>

* {
  outline: none;
}

html,
body {
  height: 100%;
  min-height: 100%;
}

body {
  margin: 0;
  background-color: #78fed7;
}

.tb {
  display: table;
  width: 100%;
}

.td {
  display: table-cell;
  vertical-align: middle;
  color: blue;
  padding: 2px;
}

input,
button {
  background-color: #78fed7;
  font-family: Nunito;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: #78fed7;
  text-align: center;
}

#cover {
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  height: 200px;
  width: 700px;
  padding-top: 1px;
  margin: -83px auto 0 auto;
  background: #78fed7;
  border-radius: 20px;
  box-shadow: 0 10px 40px #ff7c7c, 0 0 0 20px #78fed7;
  transform: scale(0.6);
}

form {
  height: 96px;
  background: #78fed7;
}

input[type="text"] {
  width: 100%;
  height: 96px;
  font-size: 60px;
  line-height: 1;
  text-align: center;
  color: black;
}

input[type="text"]::placeholder {
  color: #e16868;
  
}

#s-cover {
  width: 1px;
  padding-left: 35px;
}

button {
  position: relative;
  display: block;
  width: 84px;
  height: 96px;
  cursor: pointer;
}

#s-circle {
  position: relative;
  top: -8px;
  left: 0;
  width: 80px;
  height: 43px;
  margin-top: 0;
  border-width: 15px;
  border: 10px solid blue;
  background-color: #78fed7;
  border-radius: 50%;
  transition: 0.5s ease all;
}

button span {
  position: absolute;
  top: 68px;
  left: 43px;
  display: block;
  width: 45px;
  height: 15px;
  background-color: #78fed7;
  border-radius: 10px;
  transform: rotateZ(52deg);
  transition: 0.5s ease all;
}

button span:before,
button span:after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45px;
  height: 15px;
  background-color: blue;
  border-radius: 10px;
  transform: rotateZ(0);
  transition: 0.5s ease all;
}

#s-cover:hover #s-circle {
  top: -1px;
  width: 67px;
  height: 15px;
  border-width: 0;
  background-color: blue;
  border-radius: 20px;
}

#s-cover:hover span {
  top: 50%;
  left: 56px;
  width: 25px;
  margin-top: -9px;
  transform: rotateZ(0);
}

#s-cover:hover button span:before {
  bottom: 11px;
  transform: rotateZ(52deg);
}

#s-cover:hover button span:after {
  bottom: -11px;
  transform: rotateZ(-52deg);
}
#s-cover:hover button span:before,
#s-cover:hover button span:after {
  right: -6px;
  width: 40px;
  background-color: blue;
}


</style>