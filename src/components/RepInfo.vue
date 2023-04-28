<script lang="ts" setup>
import type { Depute } from "@/models/rep";
import { computed } from "vue";

const props = defineProps<{
  rep: Depute;
}>();

const repImage = computed(() => {
  const imageRef = props.rep.acteur.uid["#text"].replace("PA", "");
  return `https://www2.assemblee-nationale.fr/static/tribun/16/photos/carre/${imageRef}.jpg`;
});

const repFullName = computed(
  () =>
    `${props.rep.acteur.etatCivil.ident.prenom} ${props.rep.acteur.etatCivil.ident.nom}`
);

const repMandate = computed(() => {
  const parliamentMandate = props.rep.acteur.mandats.mandat.find(
    (mandate) => mandate["@xsi:type"] === "MandatParlementaire_type"
  );
  return parliamentMandate;
});
</script>

<template>
  <article>
    <figure class="mb-8 mx-auto w-60 h-60 rounded-full overflow-hidden">
      <img
        :src="repImage"
        :alt="repFullName"
        class="w-full h-full object-contain"
      />
    </figure>

    <h1 class="mb-4 text-center font-bold text-3xl">
      {{ repFullName }}
    </h1>
    <h2 class="text-center font-bold text-xl">
      {{ repMandate?.election?.lieu.departement }} -
      {{ repMandate?.election?.lieu.numCirco }}e circonscription
    </h2>
  </article>
</template>
