<template>
  <div class="q-pa-md">
    <div>
      <q-btn flat @click="$router.go(-1)" icon="arrow_back" />
    </div>
    <div class="text-h6">Create Job Ad</div>
    <q-form @submit.prevent="createJobAd" class="q-gutter-md">
      <q-input
        outlined
        flat
        dense
        v-model="jobAd.name"
        label="Job Title" :rules="[(val: string) => !!val || 'Field is required']"
      />
      <q-input
        outlined
        flat
        dense
        v-model="jobAd.office"
        label="Office Location"
        :rules="[(val: string) => !!val || 'Field is required']"
      />
      <q-input
        outlined
        flat
        dense
        v-model="jobAd.email"
        label="Contact Email"
        type="email"
        :rules="[(val: string) => !!val || 'Field is required']"
      />
      <q-input
        outlined
        flat
        dense
        v-model="jobAd.yearsOfExperience"
        label="Years of Experience"
        type="number"
        :rules="[(val: string) => !!val || 'Field is required']"
      />
      <q-card flat bordered class="q-pa-md q-gutter-sm">
        <div class="q-pb-sm">Job Description</div>
        <q-card-section class="q-pa-none">
          <div v-for="(desc, index) in jobAd.jobDescription" :key="index" class="q-mb-md q-gutter-sm">
            <q-input outlined flat dense v-model="desc.name" label="Job Description Title" :rules="[(val: string) => !!val || 'Field is required']" />
            <!-- Editor should also be required -->
            <q-editor v-model="desc.value" min-height="5rem" />
          </div>
        </q-card-section>
        <!-- Action Buttons -->
        <q-card-actions class="q-px-none">
          <q-btn type="button" icon="add" @click="addJobAdRow" flat />
          <q-btn
            type="button"
            icon="remove"
            @click="removeJobAdRow(jobAd.jobDescription.length - 1)"
            flat
            :disable="jobAd.jobDescription.length <= 1"
          />
        </q-card-actions>
      </q-card>
      <div class="actions row justify-end">
        <q-btn type="submit" label="Save" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useJobAdStore } from 'src/stores/job-ad-store';
import { useRouter } from 'vue-router';

const $router = useRouter();

const jobAdStore = useJobAdStore();

interface JobDescription {
  name: string;
  value: string;
}

interface JobAd {
  name: string;
  office: string;
  email: string;
  yearsOfExperience: string;
  jobDescription: JobDescription[];
}

const jobAd = ref<JobAd>({
  name: '',
  office: '',
  email: '',
  yearsOfExperience: '',
  jobDescription: [{ name: '', value: '' }],
});

const createJobAd = async () => {
  await jobAdStore.createJobAd(jobAd.value);
};

const addJobAdRow = () => {
  // Logic to add another job description row can be implemented here
  console.log('Add another job description row');
  jobAd.value.jobDescription.push({
    name: '',
    value: ''
  });
};

const removeJobAdRow = (index: number) => {
  jobAd.value.jobDescription.splice(index, 1);
};
</script>
