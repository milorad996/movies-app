<template>
  <button id="load-more" @click="handleLoadMore">Show More</button>
</template>

<script>
export default {
  methods: {
    handleLoadMore() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style scoped>
#load-more {
  width: calc((100% / 3) - 8px);
  padding: 16px;
  background-color: rgb(56, 94, 0);
  border: none;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  border-radius: 3px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  display: inline;
  width: 170px;
}

#load-more:not([disabled]):hover {
  box-shadow: 0 1px 9px rgba(0, 0, 0, 0.2);
}

#load-more[disabled] {
  background-color: #eaeaea !important;
}
#load-more:hover {
  background-color: greenyellow;
  color: white;
}
</style>
