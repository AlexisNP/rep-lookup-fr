import type { Depute } from "@/models/rep";
import { defineStore } from "pinia";
import { ref } from "vue";

const apiUrl = import.meta.env.VITE_API_URL;

export const useRepStore = defineStore("repStore", () => {
  const currentRep = ref<Depute | null>(null);

  async function getRep(lon: number, lat: number): Promise<Depute> {
    return fetch(`${apiUrl}/rep?lat=${lat}&lon=${lon}`).then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.json().then((res) => new Error(res.message));
      }
    });
  }

  function setRep(rep: Depute) {
    currentRep.value = rep;
  }

  return { getRep, setRep, currentRep };
});
