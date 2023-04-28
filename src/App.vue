<script setup lang="ts">
import Navbar from "./components/navbar/Navbar.vue";
</script>

<template>
  <div id="wrapper">
    <Navbar />
    <div class="flex justify-center items-center">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  min-height: 100dvh;
  min-height: 100vh;

  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
