<template>
  <div class="searchbar">
    <input
      v-model="query"
      class="form-control searchbar__input"
      placeholder="Search..."
      @input="searching"
    >
    <img
      class="searchbar__search-icon"
      src="../../assets/hand_lens.svg"
    >
  </div>
</template>

<script src="../../javascripts/search.js"></script>

<style lang="scss" src="../../stylesheets/search.scss" scoped></style>