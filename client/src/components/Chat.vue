<template>
  <div>

    <SearchBar
      :entities.sync="chatMails"
      :search.sync="search"
      :type="type"
    />

    <h3 v-show="message" class="no-results-title">
      {{ message }}
    </h3>

    <b-button class="option-delete" @click="showDeleteModal" />

    <div v-show="hasResults">

      <p class="results-amount">
        ({{ entitiesAmount }} results)
      </p>

      <ul class="collection">
        <li v-for="chatMail in chatMails.messages" :key="chatMail.id" class="collection__item">

          <router-link :to="{ name: 'Mail', params:{id: chatMail.id}}" class="collection__item-link">
            {{ chatMail.name }}
          </router-link>

          <div class="collection__item-labels">
            <b-badge
              v-show="chatMail.labels.incoming == true"
              pill
              class="collection__item-label"
            >
              incoming
            </b-badge>
            <b-badge
              v-show="chatMail.labels.incoming == false"
              pill
              class="collection__item-label"
            >
              outgoing
            </b-badge>
            <b-badge
              v-show="chatMail.labels.unread"
              pill
              class="collection__item-label"
            >
              unread
            </b-badge>
            <b-badge
              v-show="chatMail.labels.important"
              pill
              class="collection__item-label"
            >
              important
            </b-badge>
            <b-badge
              v-show="chatMail.labels.spam"
              pill
              class="collection__item-label"
            >
              spam
            </b-badge>
          </div>
        </li>
      </ul>

      <PaginationMenu
        :entities.sync="chatMails"
        :search="search"
        :entities-amount.sync="entitiesAmount"
        :type="type"
      />
    </div>

  </div>
</template>

<script src="../javascripts/chat.js"></script>

<style lang="scss" src="../stylesheets/collections.scss"></style>
