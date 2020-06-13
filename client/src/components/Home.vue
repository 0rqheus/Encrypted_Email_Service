<template>
  <main class="main">
    <h1 class="main__title">
      Welcome to Encrypted Email Service!
    </h1>

    <p class="main__text">
      This service offers you secure email usage. Here you can send emails to other without worry about their safety.
    </p>

    <img
      class="home-img"
      src="../assets/seq.jpeg"
      alt="sequrity"
    >

    <p class="main__text">
      We encrypt text in all messages you have, which guarantees protection from third party access. So you can not be afraid for your data.
    </p>

    <img
      class="home-img"
      src="../assets/email.jpeg"
      alt="email"
    >

    <p class="main__text">
      For the rest it's a regular mail, where you can send messages and manage(e.g delete, set labels, etc) them.
    </p>
  </main>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss" src="../stylesheets/info.scss"></style>
