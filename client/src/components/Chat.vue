<template>
  <div>
    <h2 class="collections-header">{{header}}</h2>

    <SearchBar class="d-none d-md-flex" v-bind:entities.sync="chatMails" v-bind:search.sync="search" v-bind:type="type" />
    <b-button class="d-none d-md-block" id="delete-btn" type="button" v-on:click="showDeleteModal"></b-button>

    <div id="tools" class="d-flex d-md-none">
      <SearchBar id="search-el" v-bind:entities.sync="chatMails" v-bind:search.sync="search" v-bind:type="type" />
      <b-button id="delete-btn" type="button" v-on:click="showDeleteModal"></b-button>
    </div>

    <div v-show="hasResults">
      <p class="results-amount">({{entitiesAmount}} results)</p>

      <ul class="collections-list">
        <li v-for="chatMail in chatMails.messages" v-bind:key="chatMail.id">
          <router-link :to="{ name: 'Mail', params:{id: chatMail.id}}">
            <p class="entity-link">{{chatMail.name}} </p>
          </router-link>
          <div id="list-labels" class="d-flex flex-wrap">
            <b-badge v-show="chatMail.labels.incoming == true" pill class="min-labels">incoming</b-badge>
            <b-badge v-show="chatMail.labels.incoming == false" pill class="min-labels">outgoing</b-badge>
            <b-badge v-show="chatMail.labels.unread" pill class="min-labels">unread</b-badge>
            <b-badge v-show="chatMail.labels.important" pill class="min-labels">important</b-badge>
            <b-badge v-show="chatMail.labels.spam" pill class="min-labels">spam</b-badge>
          </div>
        </li>
      </ul>

      <PaginationMenu
        v-bind:entities.sync="chatMails"
        v-bind:search="search"
        v-bind:entitiesAmount.sync="entitiesAmount"
        v-bind:type="type"
      />
    </div>
  </div>
</template>

<script src="../javascripts/chat.js"></script>

<style src="../stylesheets/collections.css"></style>
