import { defineStore } from "pinia";

export const useCirStore = defineStore("repStore", () => {
  async function getRep(lon: number, lat: number): Promise<any> {
    return fetch(`http://localhost:3000/rep?lat=${lat}&lon=${lon}`).then((t) =>
      t.json()
    );
  }

  return { getRep };
});
