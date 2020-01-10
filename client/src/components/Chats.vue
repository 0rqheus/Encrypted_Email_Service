<template>
  <div>
    <h2 class="collections-header">{{header}}</h2>

    <SearchBar v-bind:entities.sync="chats" v-bind:search.sync="search" type="chats" />

    <div v-show="hasResults">
      <p class="results-amount">({{entitiesAmount}} results)</p>

      <ul class="collections-list">
        <li v-for="chat in chats" v-bind:key="chat._id">
          <router-link :to="{ name: 'Chat', params:{id: chat._id}}">
            <p class="entity-link">{{ userLogin === chat.person1 ? chat.person2 : chat.person1}}</p>
          </router-link>
        </li>
      </ul>

      <PaginationMenu
        v-bind:entities.sync="chats"
        v-bind:search="search"
        v-bind:entitiesAmount.sync="entitiesAmount"
        type="chats"
      />
    </div>
  </div>
</template>

<script src="../javascripts/chats.js"></script>

<style src="../stylesheets/collections.css"></style>
