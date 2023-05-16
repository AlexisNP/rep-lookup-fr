<script lang="ts" setup>
import type { Organisation } from "@/models/org";
import RepButton from "./RepButton.vue";

import type { Depute } from "@/models/rep";
import { computed, onMounted, ref } from "vue";

const apiUrl = import.meta.env.VITE_API_URL;

const props = defineProps<{
  rep: Depute;
}>();

const politicalPartyId = props.rep.acteur.mandats.mandat.find(
  (m) => m.typeOrgane === "GP" && !m.dateFin
)?.organes.organeRef;

const repPoliticalParty = ref<Organisation | null>(null);

onMounted(async () => {
  repPoliticalParty.value = await fetch(
    `${apiUrl}/org?id=${politicalPartyId}`
  ).then((t) => t.json());
});

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
    (mandate) => mandate.typeOrgane === "ASSEMBLEE"
  );
  return parliamentMandate;
});

const repTwitter = computed(() =>
  props.rep.acteur.adresses.adresse.find(
    (adr) => adr["typeLibelle"] === "Twitter"
  )
);
const repFacebook = computed(() => {
  const data = props.rep.acteur.adresses.adresse.find(
    (adr) => adr["typeLibelle"] === "Facebook"
  );
  if (data) {
    data.valElec = String(data.valElec).replace(/^(.*[\\/])/, "");
  }
  return data;
});
const repInstagram = computed(() => {
  const data = props.rep.acteur.adresses.adresse.find(
    (adr) => adr["typeLibelle"] === "Instagram"
  );
  return data;
});
const repLinkedin = computed(() => {
  const data = props.rep.acteur.adresses.adresse.find(
    (adr) => adr["typeLibelle"] === "Linkedin"
  );
  if (data) {
    data.valElec = String(data.valElec).replace(/^(.*[\\/])/, "");
  }
  return data;
});

const regionBgFile = computed(() => {
  if (
    repMandate.value?.election?.lieu.departement ===
    "Français établis hors de France"
  ) {
    return `regions/fr-etranger-${String(
      repMandate.value?.election?.lieu.numCirco
    )}.svg`;
  } else {
    return `regions/${String(repMandate.value?.election?.lieu.region)
      .toLocaleLowerCase()
      .replace(/\s/g, "-")}.svg`;
  }
});
</script>

<template>
  <section class="py-8 md:py-0 w-96 max-w-full">
    <header class="relative">
      <div class="text-center">
        <small class="text-base font-bold"> Votre député·e est... </small>
      </div>
      <figure class="mt-4 mx-auto w-44 h-44 rounded-full overflow-hidden">
        <img
          :src="repImage"
          :alt="repFullName"
          class="w-full h-full object-contain"
        />
      </figure>

      <h1 class="mt-4 text-center font-bold text-3xl">
        {{ repFullName }}
      </h1>
      <div
        v-if="repPoliticalParty"
        class="text-center font-bold"
        :style="`color: ${repPoliticalParty.organe.couleurAssociee}`"
      >
        {{ repPoliticalParty.organe.libelle }}
      </div>
      <h2 class="mt-2 text-center font-bold text-xl">
        {{ repMandate?.election?.lieu.departement }} -
        {{ repMandate?.election?.lieu.numCirco }}e circonscription
      </h2>

      <img
        :src="regionBgFile"
        class="absolute top-0 left-0 w-full h-full object-contain select-none -z-20 pointer-events-none"
      />
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

      <menu
        class="mt-4 flex flex-col gap-y-4 md:justify-center md:flex-row md:gap-x-3 md:gap-y-0"
      >
        <li v-if="repTwitter">
          <RepButton
            :href="`https://twitter.com/${repTwitter.valElec}`"
            target="_blank"
            rel="noopener"
            :style="'btn-twitter'"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
            <span>Twitter</span>
          </RepButton>
        </li>

        <li v-if="repFacebook">
          <RepButton
            :href="`https://www.facebook.com/${repFacebook.valElec}`"
            target="_blank"
            rel="noopener"
            :style="'btn-facebook'"
          >
            <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
            <span>Facebook</span>
          </RepButton>
        </li>

        <li v-if="repLinkedin">
          <RepButton
            :href="`https://www.linkedin.com/${repLinkedin.valElec}`"
            target="_blank"
            rel="noopener"
            :style="'btn-linkedin'"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
            <span>Linkedin</span>
          </RepButton>
        </li>

        <li v-if="repInstagram">
          <RepButton
            :href="`https://www.instagram.com/${repInstagram.valElec}`"
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
