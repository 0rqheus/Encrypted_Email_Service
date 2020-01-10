<template>
  <div>

    <h2 class="collections-header">{{header}}</h2>

    <SearchBar class="d-none d-md-flex" v-bind:entities.sync="mails" v-bind:search.sync="search" type="mails" />
    <router-link id="compose" class="nav-link d-none d-md-flex" :to="{ name: 'Compose'}">
      <img src="../assets/add.svg" alt="Compose Mail" width="45px" height="45px" />
    </router-link>

    <div id="tools" class="d-flex d-md-none">
      <SearchBar id="search-el" v-bind:entities.sync="mails" v-bind:search.sync="search" type="mails" />
      <router-link id="compose" class="nav-link" :to="{ name: 'Compose'}">
        <img src="../assets/add.svg" alt="Compose Mail" width="45px" height="45px" />
      </router-link>
    </div>

    <div v-show="hasResults">
      <p class="results-amount">({{entitiesAmount}} results)</p>

      <ul id="mails-list" class="collections-list">
        <li  v-for="mail in mails" v-bind:key="mail._id">
          <router-link  :to="{ name: 'Mail', params:{id: mail._id}}">
            <p class="entity-link">{{mail.subject}}</p>
          </router-link>
          <div id="list-labels" class="d-flex flex-wrap">
            <b-badge v-show="mail.labels.incoming == true" pill class="min-labels">incoming</b-badge>
            <b-badge v-show="mail.labels.incoming == false" pill class="min-labels">outgoing</b-badge>
            <b-badge v-show="mail.labels.unread" pill class="min-labels">unread</b-badge>
            <b-badge v-show="mail.labels.important" pill class="min-labels">important</b-badge>
            <b-badge v-show="mail.labels.spam" pill class="min-labels">spam</b-badge>
          </div>
        </li>
      </ul>

      <PaginationMenu
        v-bind:entities.sync="mails"
        v-bind:search="search"
        v-bind:entitiesAmount.sync="entitiesAmount"
        type="mails"
      />
    </div>
  </div>
</template>

<script src="../javascripts/mails.js"></script>

<style src="../stylesheets/collections.css"></style>
