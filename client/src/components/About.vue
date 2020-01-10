<template>
  <main>

    <p>This service using e2e encryption, data encrypt on client, so outside your browser no one is able to read youd emails, even if he steals it.</p>
    <p>Also, you can use api to manage mails from other application.</p>

    <router-link class="nav-link" :to="{ name: 'Developer'}">API documentation</router-link>
  </main>
</template>

<script>
export default {
  name: "About"
};
</script>

<style src="../stylesheets/info.css"></style>
