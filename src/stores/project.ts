import { defineStore } from "pinia";
import type { JSONContent } from "@tiptap/vue-3";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    project: [] as JSONContent[],
  }),

  actions: {
    setProjectData(project: Array<JSONContent>) {
      this.$state.project = project;
    },
  },
});
