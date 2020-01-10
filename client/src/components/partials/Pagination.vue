<template>
  <div>
    <div id="pagination-container">
      <div id="pagination-menu">
        <img
          v-on:click="previous"
          id="prev"
          class="pagination-btn"
          src="../../assets/left_angular_arrow.svg"
        />
        <p id="page-info" class="align-self-center">{{currPage}} of {{pagesAmount}}</p>
        <img
          v-on:click="next"
          id="next"
          class="pagination-btn"
          src="../../assets/right_angular_arrow.svg"
        />
      </div>

      <div id="goto-page-menu">
        <input v-on:click="goto" id="goto-page-btn" type="button" class="myBtn-outline" value="Go to:" />
        <input
          id="goto-page-num"
          name="page-num"
          type="number"
          min="1"
          value="1"
          v-bind:max="pagesAmount"
        />
      </div>
    </div>
  </div>
</template>

<script src="../../javascripts/pagination.js"></script>

<style src="../../stylesheets/pagination.css" scoped></style>