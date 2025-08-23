import { acceptHMRUpdate, defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export interface JobAd {
  id: number;
  name: string;
  office: string;
  is_external: boolean;
  external_name: string;
  external_id: string;
  metadata: string;
}

export const useJobAdStore = defineStore('jobAd', {
  state: () => ({
    jobAds: [] as JobAd[],
  }),
  actions: {
    async fetchJobAds() {
      const response = await api.get('job-ads');
      this.jobAds = response.data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobAdStore, import.meta.hot));
}
