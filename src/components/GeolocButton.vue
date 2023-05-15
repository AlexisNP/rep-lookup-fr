<script lang="ts" setup>
import { useRepStore } from "@/stores/repStore";
import { useGeolocation } from "@vueuse/core";
import RepButton from "./RepButton.vue";
import { computed, ref } from "vue";

const { getRep, setRep } = useRepStore();

const { coords } = useGeolocation({
  enableHighAccuracy: true,
});
const isFetching = ref<boolean>(false);
const lastError = ref<string>("");

const buttonIcon = computed(() =>
  isFetching.value ? "spinner" : "location-dot"
);

async function handleGeolocClick() {
  isFetching.value = true;

  try {
    const rep = await getRep(coords.value.longitude, coords.value.latitude);

    setRep(rep);
  } catch (err) {
    const error = (await err) as Error;
    lastError.value = error.message;
  } finally {
    isFetching.value = false;
  }
}
</script>

<template>
  <RepButton @click="handleGeolocClick" :style="'btn-red'">
    <font-awesome-icon
      :icon="['fass', buttonIcon]"
      size="lg"
      :class="{ 'fa-spin': isFetching }"
    />
    <span>Géolocalisation</span>
  </RepButton>
  <div
    v-if="!lastError && coords.accuracy > 1000"
    class="mt-4 max-w-lg mx-auto text-sm text-red-400"
  >
    Position peu précise ; votre député sera peut être différement de notre
    résultat
  </div>
  <div v-if="lastError" class="mt-4 max-w-lg mx-auto text-sm text-red-400">
    {{ lastError }}
  </div>
</template>
