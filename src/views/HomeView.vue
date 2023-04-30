<script lang="ts" setup>
import GeolocRequest from "@/components/GeolocRequest.vue";
import RepInfo from "@/components/RepInfo.vue";
import { useRepStore } from "@/stores/repStore";
import { storeToRefs } from "pinia";

const { currentRep } = storeToRefs(useRepStore());
</script>

<template>
  <div>
    <main class="container py-4">
      <Transition name="fade" mode="out-in">
        <GeolocRequest v-if="!currentRep" />
        <Suspense v-else>
          <RepInfo :rep="currentRep" />
        </Suspense>
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>
