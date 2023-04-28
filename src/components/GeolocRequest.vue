<script lang="ts" setup>
import { useRepStore } from "@/stores/repStore";
import { useGeolocation } from "@vueuse/core";

const { coords } = useGeolocation();
const { getRep, setRep } = useRepStore();

async function handleGeolocClick() {
  const rep = await getRep(coords.value.longitude, coords.value.latitude);
  setRep(rep);
}
</script>

<template>
  <button
    class="py-2 px-4 rounded-sm bg-white text-sm text-slate-950"
    @click="handleGeolocClick"
  >
    Trouver mon député
  </button>
</template>
