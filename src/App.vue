<template>
  <div id="wrapper">
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
  grid-template-rows: 1fr;
}
</style>
