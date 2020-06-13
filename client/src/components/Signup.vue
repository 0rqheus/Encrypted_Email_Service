<template>
  <form
    class="custom-form needs-validation mt-md-5 d-flex flex-column align-items-center m-md-auto"
    novalidate
    @submit="signup"
  >
    <h1 class="custom-form__header">
      Sign Up
    </h1>


    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3">
      <label class="custom-form__label" for="loginInput">
        Login:
      </label>
      <input
        id="loginInput"
        v-model="login"
        class="form-control custom-form__input"
        type="email"
        name="login"
        placeholder="jaden@example.com"
        required
        @input="checkLogin"
      >
      <div ref="loginInvalidFeedback" class="invalid-feedback">
        Please, enter a valid email address!
      </div>
    </div>

    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3">
      <label class="custom-form__label" for="passwordInput">
        Password:
      </label>
      <input
        id="passwordInput"
        v-model="pass"
        v-b-tooltip.hover
        title="Keep in mind that for security reasons, you cannot change or reset your password"
        class="form-control custom-form__input"
        type="password"
        name="password"
        minlength="3"
        maxlength="50"
        required
        @input="comparePasswords"
      >
      <div class="invalid-feedback">
        Please, enter a password!
      </div>
    </div>

    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3 mb-5">
      <label class="custom-form__label" for="confirmPassInput">
        Confirm:
      </label>
      <input
        id="confirmPassInput"
        ref="confirmPass"
        v-model="confirmPass"
        class="form-control custom-form__input"
        type="password"
        name="confirmPass"
        required
        @input="comparePasswords"
      >
      <div class="invalid-feedback">
        Passwords must be equal
      </div>
    </div>


    <button class="myBtn_outline custom-form__submit" type="submit">
      Submit
    </button>

  </form>
</template>

<script src="../javascripts/signup.js"></script>

<style lang="scss" src="../stylesheets/form.scss" scoped></style>
