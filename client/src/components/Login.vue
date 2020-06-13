<template>
  <form
    class="custom-form needs-validation mt-md-5 d-flex flex-column align-items-center m-md-auto"
    name="user"
    novalidate
    @submit="login"
  >
    <h1 class="custom-form__header">
      Login
    </h1>

    <div v-show="showError" class="custom-form__error">
      <span class="custom-form__error-text">
        Login and/or password are incorrect
      </span>
    </div>


    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-md-3">
      <label class="custom-form__label" for="loginInput">
        Login:
      </label>
      <input 
        id="loginInput"
        class="form-control custom-form__input" 
        type="email" 
        name="login" 
        required
      >
      <div class="invalid-feedback">
        Please, enter a valid email address!
      </div>
    </div>

    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3 mb-5">
      <label class="custom-form__label" for="passwordInput">
        Password:
      </label>
      <input
        id="passwordInput"
        v-model="password"
        class="form-control custom-form__input"
        type="password"
        name="password"
        required
      >
      <div class="invalid-feedback">
        Please, enter a password!
      </div>
    </div>


    <button class="myBtn_outline custom-form__submit" type="submit">
      Submit
    </button>
    
  </form>
</template>

<script src="../javascripts/login.js"></script>

<style lang="scss" src="../stylesheets/form.scss" scoped></style>