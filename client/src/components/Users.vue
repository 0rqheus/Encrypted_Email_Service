<template>
<div>
    <h2 class="collections-header">{{header}}</h2>

    <SearchBar v-bind:entities.sync="users" v-bind:search.sync="search" type="users" />

    <div v-show="hasResults">
      <p class="results-amount">({{entitiesAmount}} results)</p>

      <table id="users-table">
            <tr>
                <th>Login</th>
                <th>Fullname</th>
                <th>Registration date</th>
            </tr>
    
            <tr v-for="user in users" v-bind:key="user._id">
                <td>
                    <router-link :to="{ name: 'User', params:{id: user._id}}">{{user.login}}</router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'User', params:{id: user._id}}">{{user.fullname || '-'}}</router-link>
                </td>
                <td>
                    {{new Date(user.registeredAt).toUTCString()}}
                </td>
            </tr>
        </table>

      <PaginationMenu
        v-bind:entities.sync="users"
        v-bind:search="search"
        v-bind:entitiesAmount.sync="entitiesAmount"
        type="users"
      />
    </div>
  </div>    
</template>

<script src="../javascripts/users.js"></script>

<style src="../stylesheets/collections.css"></style>
