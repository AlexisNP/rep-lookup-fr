<script lang="ts" setup>
import { useCirStore } from "@/stores/cir";
import { useGeolocation } from "@vueuse/core";
import { ref } from "vue";

const { coords } = useGeolocation();
const { geoData, getCounty } = useCirStore();

const currentCountyCode = ref<string | null>("");

function handleGeolocClick() {
  currentCountyCode.value = getCounty(
    coords.value.longitude,
    coords.value.latitude
  );
}
</script>

<template>
  <div>
    <main class="container py-4">
      <button
        v-if="geoData.isReady"
        class="py-2 px-4 rounded-sm bg-white text-sm text-slate-950"
        @click="handleGeolocClick"
      >
        Get Code
      </button>
      {{ currentCountyCode }}
    </main>
  </div>
</template>
