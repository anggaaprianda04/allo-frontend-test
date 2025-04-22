import { defineStore } from "pinia";
import spaceXService from "@/services/spaceXService";
import type { IRocket } from "@/types/Rocket";

export const useRocketStore = defineStore('rocket', {
  state: () => ({
    rockets: [] as IRocket[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchRocketList() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await spaceXService.getAllRocket();
        this.rockets = response.data;
      } catch {
        this.error = 'Failed to fetch rockets';
      } finally {
        this.isLoading = false;
      }
    }
  }
})
