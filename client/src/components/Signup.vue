<template>
  <form
    id="registerForm"
    v-on:submit="signup"
    class="inputForm needs-validation mt-md-5 d-flex flex-column align-items-center m-md-auto"
    novalidate
  >
    <h1 class="inputFormHeader">Sign Up</h1>

    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3">
      <label for="login">Login:</label>
      <input
        v-model="login"
        v-on:input="checkLogin"
        class="form-control"
        type="email"
        id="login"
        name="login"
        placeholder="jaden@example.com"
        required
      />
      <div ref="loginInvalidFeedback" class="invalid-feedback">Please, enter a valid email address!</div>
    </div>
    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3">
      <label for="password">Password:</label>
      <input
        v-b-tooltip.hover title="For security reasons, you cannot change or reset your password"
        v-model="pass"
        v-on:input="comparePasswords"
        class="form-control"
        type="password"
        name="password"
        minlength="3"
        maxlength="50"
        required
      />
      <div class="invalid-feedback">Please, enter a password!</div>
    </div>
    <div class="form-group col-xs-8 col-md-6 col-lg-4 ml-md-2 ml-lg-4 mt-3">
      <label for="confirmPass">Confirm:</label>
      <input
        ref="confirmPass"
        v-model="confirmPass"
        v-on:input="comparePasswords"
        class="form-control"
        type="password"
        name="confirmPass"
        required
      />
      <div class="invalid-feedback">Passwords must be equal</div>
    </div>

    <input
      class="myBtn-outline btn-lg col-xs-8 col-md-3 col-lg-2 mt-0 mt-lg-5"
      type="submit"
      value="Submit"
    />
  </form>
</template>

<script src="../javascripts/signup.js"></script>

<style src="../stylesheets/form.css" scoped></style>
