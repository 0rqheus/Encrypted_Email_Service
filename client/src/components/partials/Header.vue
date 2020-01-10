<template>
  <header>

    <b-navbar toggleable="lg">
        <b-navbar-brand>
          <router-link class="nav-link" :to="{ name: 'Home'}">
            <img id="logo" src="../../assets/logo.svg" alt="Logo image" />
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav id="main-nav">
            <b-nav-item to="/" exact>Home</b-nav-item>
            <b-nav-item v-if="this.$store.state.user.role" to="/users" exact>Users</b-nav-item>
            <b-nav-item to="/mails" exact>Mails</b-nav-item>
            <b-nav-item to="/chats" exact>Chats</b-nav-item>
            <b-nav-item to="/about" exact>About</b-nav-item>
          </b-navbar-nav>

          <hr class="d-lg-none">

          <b-navbar-nav id="auth-nav" class="ml-auto">
            <template v-if="this.$store.state.user.login">
              <b-nav-item>
                <router-link
                  id="user-login"
                  class="nav-link auth"
                  :to="{ name: 'User', params:{id: this.$store.state.user._id}}"
                >{{this.$store.state.user.login}}</router-link>
              </b-nav-item>
              <b-nav-item>
                <a v-on:click="logout" class="nav-link auth">Logout</a>
              </b-nav-item>
            </template>

            <template v-else>
              <b-nav-item to="/login" exact>Login</b-nav-item>
              <b-nav-item to="/signup" exact>Signup</b-nav-item>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

  </header>
</template>

<script src="../../javascripts/header.js"></script>

<style src="../../stylesheets/header.css" scoped></style>
