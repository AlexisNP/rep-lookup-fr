<script lang="ts" setup>
import { ref } from "vue";
import GeolocButton from "./GeolocButton.vue";
import RepButton from "./RepButton.vue";

const hasAcceptedGeoloc = ref(false);

function acceptGeoloc() {
  hasAcceptedGeoloc.value = true;
}
</script>

<template>
  <section class="text-center">
    <header class="mb-4">
      <h1 class="mt-4 text-center font-bold text-3xl">
        Qui me représente à l'Assemblée Nationale ?
      </h1>
    </header>

    <RepButton
      @click="acceptGeoloc"
      :style="'btn-red'"
      v-if="!hasAcceptedGeoloc"
    >
      <font-awesome-icon :icon="['fass', 'twitter']" size="lg" />
      <span>Me géolocaliser</span>
    </RepButton>
    <GeolocButton v-else />
  </section>
</template>
