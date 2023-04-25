import { useAsyncState } from "@vueuse/core";
import { defineStore } from "pinia";

import * as GeoJsonGeometriesLookup from "geojson-geometries-lookup";

export const useCirStore = defineStore("cirStore", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let gl: any = null;

  const geoData = useAsyncState(
    fetch("/data/circonscriptions-legislatives.json.gz").then((t) => t.json()),
    {},
    {
      onSuccess(data) {
        gl = new GeoJsonGeometriesLookup(data);
      },
    }
  );

  function getCounty(lon: number, lat: number): string | null {
    const pos = {
      type: "Point",
      coordinates: [lon, lat],
    };
    return gl.getContainers(pos).features[0]?.properties["REF"] as
      | string
      | null;
  }

  return { geoData, getCounty };
});
