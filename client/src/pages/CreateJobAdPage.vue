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
        type="text"
        :rules="[(val: string) => !!val || 'Field is required']"
      />
      <q-card flat bordered class="q-pa-md q-gutter-sm">
        <div class="q-pb-sm">Job Description</div>
        <q-card-section class="q-pa-none">
          <div v-for="(desc, index) in jobAd.jobDescriptions" :key="index" class="q-mb-md">
            <q-input
              outlined
              flat
              dense
              v-model="desc.name"
              label="Job Description Title"
              :rules="[(val: string) => !!val || 'Field is required']"
            />
            <!-- Editor should also be required -->
            <q-editor
              v-model="desc.value"
              min-height="5rem"
              :fonts="['Arial', 'Courier New', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']"
              :toolbar="[
                ['bold', 'italic', 'underline', 'strike'],
                ['left', 'center', 'right'],
                ['quote', 'unordered', 'ordered'],
                ['link'],
                ['undo', 'redo'],
              ]"
            />
          </div>
        </q-card-section>
        <!-- Action Buttons -->
        <q-card-actions class="q-px-none">
          <q-btn type="button" icon="add" @click="addJobAdRow" flat />
          <q-btn
            type="button"
            icon="remove"
            @click="removeJobAdRow(jobAd.jobDescriptions.length - 1)"
            flat
            :disable="jobAd.jobDescriptions.length <= 1"
          />
        </q-card-actions>
      </q-card>
      <div class="actions row justify-end">
        <q-btn color="primary" type="submit" icon="save" />
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
  jobDescriptions: JobDescription[];
}

const jobAd = ref<JobAd>({
  name: '',
  office: '',
  email: '',
  yearsOfExperience: '',
  jobDescriptions: [{ name: '', value: '' }],
});

const createJobAd = async () => {
  await jobAdStore.createJobAd(jobAd.value);
  void $router.push({ name: 'list' });
};

const addJobAdRow = () => {
  // Logic to add another job description row can be implemented here
  jobAd.value.jobDescriptions.push({
    name: '',
    value: ''
  });
};

const removeJobAdRow = (index: number) => {
  jobAd.value.jobDescriptions.splice(index, 1);
};
</script>
