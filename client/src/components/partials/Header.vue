<template>
  <header class="header">
    <b-navbar toggleable="lg">

      <b-navbar-brand class="logo">
        <router-link class="nav-link logo__link" :to="{ name: 'Home'}">
          <img class="logo__img" src="../../assets/logo.svg" alt="logo">
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" class="nav-collapse" is-nav>

        <b-navbar-nav class="main-nav">
          <b-nav-item to="/" exact>
            Home
          </b-nav-item>
          <b-nav-item v-if="this.$store.state.user.role" to="/users" exact>
            Users
          </b-nav-item>
          <b-nav-item to="/mails" exact>
            Mails
          </b-nav-item>
          <b-nav-item to="/chats" exact>
            Chats
          </b-nav-item>
          <b-nav-item to="/about" exact>
            About
          </b-nav-item>
        </b-navbar-nav>

        <hr class="d-lg-none delimeter">

        <b-navbar-nav class="ml-auto">

          <template v-if="this.$store.state.user.login">

            <b-nav-item :to="{ name: 'User', params:{id: this.$store.state.user._id}}">
              <span class="auth-item user-login">
                {{ this.$store.state.user.login }}
              </span>
            </b-nav-item>

            <b-nav-item @click="logout">
              <span class="auth-item">
                Logout
              </span>
            </b-nav-item>

          </template>

          <template v-else>

            <b-nav-item to="/login" exact>
              <span class="auth-item">
                Login
              </span>
            </b-nav-item>

            <b-nav-item to="/signup" exact>
              <span class="auth-item">
                Sign up
              </span>
            </b-nav-item>

          </template>

        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
  </header>
</template>

<script src="../../javascripts/header.js"></script>

<style lang="scss" src="../../stylesheets/header.scss" scoped></style>
