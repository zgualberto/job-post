import type { AxiosError } from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Notify } from 'quasar';
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
    currentJobAd: null as JobAd | null,
  }),
  actions: {
    async fetchJobAds() {
      try {
        const response = await api.get('job-ads');
        this.jobAds = response.data;
      } catch {
        Notify.create({
          message: 'Error fetching job ads',
          type: 'negative',
        });
      }
    },
    async fetchJobAdById(id: number) {
      try {
        const response = await api.get(`job-ads/${id}`);
        this.currentJobAd = response.data;
      } catch {
        Notify.create({
          message: 'Error fetching job ad',
          type: 'negative',
        });
      }
    },
    async createJobAd(jobAdData: Partial<JobAd>) {
      try {
        console.log(jobAdData);
        const response = await api.post('job-ads', jobAdData);
        this.jobAds.push(response.data);
        Notify.create({
          message: 'Job ad created successfully',
          type: 'positive',
        });
      } catch (error) {
        const axiosErrors = error as AxiosError;
        console.log(axiosErrors.response?.data);
        // for (const [message] of Object.entries(axiosErrors.response?.data?.messages || {})) {
        //   Notify.create({
        //     message: message,
        //     type: 'negative',
        //     position: 'top-right',
        //   });
        // }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobAdStore, import.meta.hot));
}
