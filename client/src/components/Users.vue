<template>
  <div>

    <SearchBar
      :entities.sync="users"
      :search.sync="search"
      type="users"
    />

    <h3 v-show="message" class="no-results-title">
      {{ message }}
    </h3>

    <div v-show="hasResults">

      <p class="results-amount">
        ({{ entitiesAmount }} results)
      </p>

      <table class="users-table">
        <tr>
          <th class="users-table__item">
            Login
          </th>
          <th class="users-table__item">
            Fullname
          </th>
          <th class="users-table__item">
            Registration date
          </th>
        </tr>
    
        <tr v-for="user in users" :key="user._id">
          <td class="users-table__item">
            <router-link :to="{ name: 'User', params:{id: user._id}}" class="users-table__item-link">
              {{ user.login }}
            </router-link>
          </td>
          <td class="users-table__item">
            <router-link :to="{ name: 'User', params:{id: user._id}}" class="users-table__item-link">
              {{ user.fullname || '-' }}
            </router-link>
          </td>
          <td class="users-table__item">
            {{ new Date(user.registeredAt).toUTCString() }}
          </td>
        </tr>
      </table>

      <PaginationMenu
        :entities.sync="users"
        :search="search"
        :entities-amount.sync="entitiesAmount"
        type="users"
      />

    </div>

  </div>    
</template>

<script src="../javascripts/users.js"></script>

<style lang="scss" src="../stylesheets/collections.scss"></style>
