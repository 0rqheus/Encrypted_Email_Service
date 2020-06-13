<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>


<script>
  import Header from "./components/partials/Header";

  export default {
      name: "App",
      components: { Header }
  };
</script>

<style lang="scss" src="./stylesheets/global.scss"></style>
