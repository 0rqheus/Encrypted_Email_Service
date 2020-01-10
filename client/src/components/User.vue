<template>
  <main class="mt-3">
    <div id="user-setting" class="btn-group">
      <b-dropdown right variant="link" id="settings">
        <template v-slot:button-content>
          <button
            id="settings-btn"
            type="button"
          >
            <img src="../assets/settings.svg" style="height: 35px; width: 35px;" />
          </button>
        </template>

      <div id="ownerActions" v-show="this.$store.state.user._id === chosenUser._id">

        <b-dropdown-item v-on:click="showDeleteModal">
          <span class="setting-item">Delete account</span>
          <img
            src="../assets/delete_user.svg"
            class="icon"
            style="right: -10px"
          />
        </b-dropdown-item>

        <b-dropdown-item >
          <router-link :to="{ name: 'Update', params:{id: this.$store.state.user._id}}" style="text-decoration: none">
            Update info
            <img
              src="../assets/change_user.svg"
              class="icon"
              style="right: -43px;"
            />
          </router-link>
        </b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>

      </div>

        <b-dropdown-item v-show="this.$store.state.user.role" v-on:click="switchRole">
          <span class="setting-item">Switch role</span>
          <img
            src="../assets/change_role.svg"
            class="icon"
            style="right: -40px"
          />
        </b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="user-container">
      <div class="photo-container">
        <img id="user-photo" v-bind:src="chosenUser.avaUrl" alt="" />
      </div>

      <div class="info-container">
        <ul>
          <li v-show="this.$store.state.user.role">({{chosenUser.role === 1 ? 'Admin' : 'User'}})</li>
          <li>{{chosenUser.login}}</li>
          <li>{{chosenUser.fullname}}</li>
          <li>"{{chosenUser.description}}"</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script src="../javascripts/user.js"></script>

<style src="../stylesheets/user.css" scoped></style>