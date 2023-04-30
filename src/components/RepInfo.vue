<script lang="ts" setup>
import RepButton from "./RepButton.vue";

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

const repSocials = {
  twitter: computed(() =>
    props.rep.acteur.adresses.adresse.find(
      (adr) => adr["typeLibelle"] === "Twitter"
    )
  ),
  facebook: computed(() =>
    props.rep.acteur.adresses.adresse.find(
      (adr) => adr["typeLibelle"] === "Facebook"
    )
  ),
  instagram: computed(() =>
    props.rep.acteur.adresses.adresse.find(
      (adr) => adr["typeLibelle"] === "Instagram"
    )
  ),
  linkedin: computed(() =>
    props.rep.acteur.adresses.adresse.find(
      (adr) => adr["typeLibelle"] === "Linkedin"
    )
  ),
};
</script>

<template>
  <section>
    <header>
      <figure class="mt-8 mx-auto w-60 h-60 rounded-full overflow-hidden">
        <img
          :src="repImage"
          :alt="repFullName"
          class="w-full h-full object-contain"
        />
      </figure>

      <h1 class="mt-4 text-center font-bold text-3xl">
        {{ repFullName }}
      </h1>
      <h2 class="text-center font-bold text-xl">
        {{ repMandate?.election?.lieu.departement }} -
        {{ repMandate?.election?.lieu.numCirco }}e circonscription
      </h2>
      <h3 class="mt-2 text-center font-medium text-lg">
        {{ rep.acteur.profession.libelleCourant }}
      </h3>
    </header>

    <footer class="mt-8">
      <div class="mt-4 text-center">
        <RepButton
          :href="`https://www.assemblee-nationale.fr/dyn/deputes/${rep.acteur.uid['#text']}`"
          target="_blank"
          rel="noopener"
          :style="'btn-red'"
        >
          <font-awesome-icon :icon="['fass', 'landmark']" size="lg" />
          <span>Fiche Assemblée</span>
        </RepButton>
      </div>

      <menu class="mt-2 flex justify-center items-center gap-4">
        <li v-if="repSocials.twitter">
          <RepButton
            :href="`https://twitter.com/${repSocials.twitter.value?.valElec}`"
            target="_blank"
            rel="noopener"
            :style="'btn-twitter'"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
            <span>Twitter</span>
          </RepButton>
        </li>

        <li v-if="repSocials.facebook">
          <RepButton
            :href="`https://www.facebook.com/${repSocials.facebook.value?.valElec}`"
            target="_blank"
            rel="noopener"
            :style="'btn-facebook'"
          >
            <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
            <span>Facebook</span>
          </RepButton>
        </li>

        <li v-if="repSocials.linkedin">
          <RepButton
            :href="`https://www.linkedin.com/${repSocials.linkedin.value?.valElec}`"
            target="_blank"
            rel="noopener"
            :style="'btn-linkedin'"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
            <span>Linkedin</span>
          </RepButton>
        </li>

        <li v-if="repSocials.instagram">
          <RepButton
            :href="`https://www.instagram.com/${repSocials.instagram.value?.valElec}`"
            target="_blank"
            rel="noopener"
            :style="'btn-instagram'"
          >
            <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
            <span>Instagram</span>
          </RepButton>
        </li>
      </menu>
    </footer>
  </section>
</template>
