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
    jobAdForModeration: null as JobAd | null,
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
    async fetchJobAdForModeration(id: number, token: string) {
      try {
        const response = await api.get(`job-ads/${id}/moderate`, {
          params: { token },
        });
        this.jobAdForModeration = response.data;
      } catch {
        Notify.create({
          message: 'Error fetching job ad for moderation',
          type: 'negative',
        });
      }
    },
    async createJobAd(jobAdData: Partial<JobAd>) {
      try {
        const response = await api.post('job-ads', jobAdData);
        this.jobAds.push(response.data);
        Notify.create({
          message: 'Job ad created successfully',
          type: 'positive',
        });
      } catch (error) {
        const axiosErrors = error as Partial<AxiosError>;
        const messages =
          (axiosErrors.response?.data as { message?: string[] } | undefined)?.message ?? undefined;
        for (const message of messages || ['Error creating job ad']) {
          Notify.create({
            message,
            type: 'negative',
            position: 'top-right',
          });
        }
      }
    },
    async moderateJobAd(id: number, action: 'Approve' | 'Reject', token: string) {
      try {
        if (!this.jobAdForModeration) {
          Notify.create({
            message: 'No job ad to moderate',
            type: 'negative',
          });
          return;
        }

        await api.patch(`job-ads/${this.jobAdForModeration.id}/moderate`, {
          token,
          action,
        });

        this.jobAdForModeration = null;

        Notify.create({
          message: `Job ad ${action.toLowerCase()}d successfully`,
          type: 'positive',
        });
      } catch (error) {
        const axiosErrors = error as Partial<AxiosError>;
        const messages =
          (axiosErrors.response?.data as { message?: string[] } | undefined)?.message ?? undefined;
        for (const message of messages || ['Error moderating job ad']) {
          Notify.create({
            message,
            type: 'negative',
            position: 'top-right',
          });
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobAdStore, import.meta.hot));
}
