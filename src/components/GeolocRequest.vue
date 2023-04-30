<script lang="ts" setup>
import { useRepStore } from "@/stores/repStore";
import { useGeolocation } from "@vueuse/core";
import RepButton from "./RepButton.vue";

const { coords } = useGeolocation();
const { getRep, setRep } = useRepStore();

async function handleGeolocClick() {
  const rep = await getRep(coords.value.longitude, coords.value.latitude);
  setRep(rep);
}
</script>

<template>
  <section class="text-center">
    <header class="mb-4">
      <h1 class="mt-4 text-center font-bold text-3xl">
        Qui me représente à l'Assemblée Nationale ?
      </h1>
    </header>
    <RepButton @click="handleGeolocClick" :style="'btn-red'">
      <font-awesome-icon :icon="['fass', 'location-dot']" size="lg" />
      <span>Géolocalisation</span>
    </RepButton>
  </section>
</template>
