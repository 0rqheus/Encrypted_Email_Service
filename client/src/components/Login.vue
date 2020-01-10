<template>
  <form
    id="loginForm"
    class="inputForm needs-validation mt-md-5 d-flex flex-column align-items-center m-md-auto"
    name="user"
    novalidate
    v-on:submit="login"
  >
    <h1 class="inputFormHeader">Login</h1>

    <div v-show="showError" id="wrong-data-err">
      <h2 style="font-size: 20px; font-weight: bold;">Login and/or password are incorrect</h2>
    </div>

    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-md-5">
      <label for="login">Login:</label>
      <input class="form-control" type="email" id="login" name="login" required />
      <div class="invalid-feedback">Please, enter a valid email address!</div>
    </div>
    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3 mb-5">
      <label for="password">Password:</label>
      <input v-model="password" class="form-control" type="password" id="password" name="password" required />
      <div class="invalid-feedback">Please, enter a password!</div>
    </div>

    <input
      class="myBtn-outline "
      id="submit"
      type="submit"
      value="Submit"
    />
  </form>
</template>

<script src="../javascripts/login.js"></script>

<style src="../stylesheets/form.css" scoped></style>