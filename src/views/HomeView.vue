<script lang="ts" setup>
import { useCirStore } from "@/stores/repStore";
import { useGeolocation } from "@vueuse/core";
import { ref } from "vue";

const { coords } = useGeolocation();
const { getRep } = useCirStore();

const currentRepValue = ref<any>();

async function handleGeolocClick() {
  currentRepValue.value = await getRep(
    coords.value.longitude,
    coords.value.latitude
  );
}
</script>

<template>
  <div>
    <main class="container py-4">
      <button
        class="py-2 px-4 rounded-sm bg-white text-sm text-slate-950"
        @click="handleGeolocClick"
      >
        Trouver mon député
      </button>
      <pre>
        {{ currentRepValue }}
      </pre>
    </main>
  </div>
</template>
