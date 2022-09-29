<template>
    <button id="load-more" @click="handleLoadMore" >Load More</button>

</template>

<script>
export default {
   methods: {
    handleLoadMore() {
        this.$emit('loadMore')
    }
   }
}
</script>

<style>
#load-more {
  width: calc((100% / 3) - 8px);
  padding: 16px;
  background-color: greenyellow;
  border: none;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  border-radius: 3px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
}
 
#load-more:not([disabled]):hover {
  box-shadow: 0 1px 9px rgba(0, 0, 0, 0.2);
}
 
#load-more[disabled] {
  background-color: #eaeaea !important;
}

</style>