<template>
  <main class="mt-3">

    <div class="btn-group settings">
      <b-dropdown variant="link" right>

        <template v-slot:button-content>
          <button class="settings__btn" type="button">
            <img class="settings__icon" src="../assets/settings.svg">
          </button>
        </template>

        <div v-show="this.$store.state.user._id === chosenUser._id">
          <b-dropdown-item @click="showDeleteModal">
            <span class="settings__item-text">
              Delete account
            </span>

            <img
              src="../assets/delete_user.svg"
              class="settings__item-icon"
              style="right: -10px"
            >
          </b-dropdown-item>

          <b-dropdown-item :to="{ name: 'Update', params:{id: this.$store.state.user._id}}" class="setting__item-link">
            <span class="settings__item-text">
              Update info
            </span>

            <img
              src="../assets/change_user.svg"
              class="settings__item-icon"
              style="right: -43px;"
            >
          </b-dropdown-item>
        </div>

        <div v-show="this.$store.state.user.role">
          <b-dropdown-divider />

          <b-dropdown-item @click="switchRole">
            <span class="settings__item-text">
              Switch role
            </span>

            <img
              src="../assets/change_role.svg"
              class="settings__item-icon"
              style="right: -40px"
            >
          </b-dropdown-item>
        </div>

      </b-dropdown>
    </div>


    <div class="user">

      <div class="user__photo-container">
        <img class="user__photo" :src="chosenUser.avaUrl" alt="user avatar">
      </div>

      <div class="user__info">
        <ul class="user__info-list">

          <li v-show="this.$store.state.user.role" class="user__info-item">
            ({{ 
              chosenUser.role === 1 
                ? 'Admin' 
                : 'User' 
            }})
          </li>

          <li class="user__info-item">
            {{ chosenUser.login }}
          </li>

          <li v-show="this.$store.state.user.fullname" class="user__info-item">
            {{ chosenUser.fullname }}
          </li>

          <li v-show="this.$store.state.user.description" class="user__info-item">
            "{{ chosenUser.description }}"
          </li>

        </ul>
      </div>
    </div>

  </main>
</template>

<script src="../javascripts/user.js"></script>

<style lang="scss" src="../stylesheets/user.scss" scoped></style>