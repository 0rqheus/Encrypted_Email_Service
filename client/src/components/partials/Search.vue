<template>
  <div id="search-menu">
    <input
      v-model="query"
      v-on:input="searching"
      id="searchbar"
      class="form-control"
      placeholder="Search..."
    />
    <img src="../../assets/hand_lens.svg" id="search-img" />
  </div>
</template>

<script src="../../javascripts/search.js"></script>

<style src="../../stylesheets/search.css" scoped></style>