<template>
  <form
    v-on:submit="update"
    class="inputForm inputForm needs-validation d-flex flex-column align-items-center"
    name="user"
    enctype="multipart/form-data"
  >

    <b-form-file class="col-11 col-md-6 mt-3" id="customFile" type="file" name="file" placeholder="Choose new photo"></b-form-file>

    <div class="form-group col-xs-8 col-md-6 mt-3">
      <label for="fullname">Fullname:</label>
      <input
        class="form-control"
        id="fullname"
        type="text"
        name="fullname"
        v-bind:value="currUser.fullname"
      />
    </div>

    <div class="form-group col-xs-8 col-md-6 mt-3">
      <label for="description">Description:</label>
      <textarea
        class="form-control"
        id="description"
        name="description"
        v-bind:value="currUser.description"
      ></textarea>
    </div>

    <input class="myBtn-outline mt-4" type="submit" value="Submit" />
  </form>
</template>

<script src="../javascripts/update.js"></script>

<style src="../stylesheets/form.css" scoped></style>