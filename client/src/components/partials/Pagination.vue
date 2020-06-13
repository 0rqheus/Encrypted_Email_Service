<template>
  <div>
    <div class="d-flex flex-column">

      <div class="pagination-menu">
        <img
          class="pagination-menu__arrow"
          src="../../assets/left_angular_arrow.svg"
          @click="previous"
        >
        <p class="pagination-menu__page-info">
          {{ currPage }} of {{ pagesAmount }}
        </p>
        <img
          class="pagination-menu__arrow"
          src="../../assets/right_angular_arrow.svg"
          @click="next"
        >
      </div>


      <div class="goTo-menu">
        <input
          type="button"
          class="goTo-menu__input goTo-menu__btn myBtn_outline"
          value="Go to:"
          @click="goTo"
        >
        <input
          class="goTo-menu__input"
          name="page-num"
          type="number"
          min="1"
          value="1"
          :max="pagesAmount"
        >
      </div>
    </div>
  </div>
</template>

<script src="../../javascripts/pagination.js"></script>

<style lang="scss" src="../../stylesheets/pagination.scss" scoped></style>