<template>
  <div>

    <SearchBar
      :entities.sync="mails"
      :search.sync="search"
      type="mails"
    />

    <h3 v-show="message" class="no-results-title">
      {{ message }}
    </h3>
    
    <router-link :to="{ name: 'Compose'}" class="option-compose nav-link">
      <img class="option-compose__icon" src="../assets/add.svg" alt="Compose Mail">
    </router-link>
    

    <div v-show="hasResults">
      <p class="results-amount">
        ({{ entitiesAmount }} results)
      </p>

      <ul class="collection">
        <li v-for="mail in mails" :key="mail._id" class="collection__item">

          <router-link :to="{ name: 'Mail', params:{id: mail._id}}" class="collection__item-link">
            {{ mail.subject }}
          </router-link>

          <div class="collection__item-labels">
            <b-badge
              v-show="mail.labels.incoming == true"
              pill
              class="collection__item-label"
            >
              incoming
            </b-badge>
            <b-badge
              v-show="mail.labels.incoming == false"
              pill
              class="collection__item-label"
            >
              outgoing
            </b-badge>
            <b-badge
              v-show="mail.labels.unread"
              pill
              class="collection__item-label"
            >
              unread
            </b-badge>
            <b-badge
              v-show="mail.labels.important"
              pill
              class="collection__item-label"
            >
              important
            </b-badge>
            <b-badge
              v-show="mail.labels.spam"
              pill
              class="collection__item-label"
            >
              spam
            </b-badge>
          </div>

        </li>
      </ul>

      <PaginationMenu
        :entities.sync="mails"
        :search="search"
        :entities-amount.sync="entitiesAmount"
        type="mails"
      />
    </div>
    
  </div>
</template>

<script src="../javascripts/mails.js"></script>

<style lang="scss" src="../stylesheets/collections.scss"></style>
