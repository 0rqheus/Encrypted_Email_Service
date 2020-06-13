<template>
  <form
    class="custom-form needs-validation d-flex flex-column align-items-center"
    name="user"
    enctype="multipart/form-data"
    @submit="update"
  >
    <b-form-file
      id="customFile"
      class="col-11 col-md-6 mt-3"
      type="file"
      name="file"
      placeholder="Choose new photo"
    />

    <div class="form-group col-xs-8 col-md-6 mt-3">
      <label class="custom-form__label" for="fullname">Fullname:</label>
      <input
        id="fullname"
        class="form-control custom-form__input"
        type="text"
        name="fullname"
        :value="currUser.fullname"
      >
    </div>

    <div class="form-group col-xs-8 col-md-6 mt-3">
      <label class="custom-form__label" for="description">Description:</label>
      <textarea
        id="description"
        class="form-control custom-form__input"
        name="description"
        :value="currUser.description"
      />
    </div>

    <button class="myBtn_outline custom-form__submit mt-4" type="submit">
      Submit
    </button>
    
  </form>
</template>

<script src="../javascripts/update.js"></script>

<style lang="scss" src="../stylesheets/form.scss" scoped></style>