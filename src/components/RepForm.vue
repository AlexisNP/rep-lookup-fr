<script lang="ts" setup>
import { onMounted, ref } from "vue";
import GeolocButton from "./GeolocButton.vue";
import RepButton from "./RepButton.vue";

const hasAcceptedGeoloc = ref(false);
const hasRefusedGeoloc = ref(false);

onMounted(() => {
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      hasAcceptedGeoloc.value = true;
      hasRefusedGeoloc.value = false;
    } else if (result.state === "denied") {
      hasAcceptedGeoloc.value = false;
      hasRefusedGeoloc.value = true;
    }

    result.addEventListener("change", () => {
      if (result.state === "granted") {
        hasAcceptedGeoloc.value = true;
        hasRefusedGeoloc.value = false;
      } else if (result.state === "denied") {
        hasAcceptedGeoloc.value = false;
        hasRefusedGeoloc.value = true;
      }
    });
  });
});

function acceptGeoloc() {
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      hasAcceptedGeoloc.value = true;
      hasRefusedGeoloc.value = false;
    } else if (result.state === "denied") {
      hasAcceptedGeoloc.value = false;
      hasRefusedGeoloc.value = true;
    }
  });
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
      :disabled="hasRefusedGeoloc"
      v-if="!hasAcceptedGeoloc"
    >
      <font-awesome-icon :icon="['fas', 'square']" size="lg" />
      <span>Me géolocaliser</span>
    </RepButton>
    <GeolocButton v-else />
  </section>
</template>
