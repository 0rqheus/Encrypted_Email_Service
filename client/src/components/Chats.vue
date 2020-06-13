<template>
  <div>

    <SearchBar
      :entities.sync="chats"
      :search.sync="search"
      type="chats"
    />

    <h3 v-show="message" class="no-results-title">
      {{ message }}
    </h3>

    <div v-show="hasResults">
      <p class="results-amount">
        ({{ entitiesAmount }} results)
      </p>

      <ul class="collection">
        <li v-for="chat in chats" :key="chat._id" class="collection__item">
          <router-link :to="{ name: 'Chat', params:{id: chat._id}}" class="collection__item-link">
            {{ userLogin === chat.person1 ? chat.person2 : chat.person1 }}
          </router-link>
        </li>
      </ul>

      <PaginationMenu
        :entities.sync="chats"
        :search="search"
        :entities-amount.sync="entitiesAmount"
        type="chats"
      />
    </div>
  </div>
</template>

<script src="../javascripts/chats.js"></script>

<style lang="scss" src="../stylesheets/collections.scss"></style>
