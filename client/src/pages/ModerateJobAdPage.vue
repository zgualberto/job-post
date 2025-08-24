<template>
  <div class="q-pa-md">
    <div>
      <q-btn flat @click="$router.push({ name: 'list' });" icon="arrow_back" />
    </div>
    <div v-if="jobAd" class="text-center">
      <div class="text-h6">{{ jobAd.name }}</div>
      <div class="text-caption">{{ jobAd.office }}</div>
    </div>

    <!-- Other Details -->
    <div v-if="jobAd" class="q-mt-md">
      <div class="q-mt-sm" v-if="JSON.parse(jobAd.metadata).createdAt">
        <strong>Posted:</strong> {{ moment(JSON.parse(jobAd.metadata).createdAt).fromNow() }}
      </div>
      <div class="q-mt-sm" v-if="JSON.parse(jobAd.metadata).yearsOfExperience">
        <strong>Years of Experience:</strong> {{ JSON.parse(jobAd.metadata).yearsOfExperience }}
      </div>
    </div>

    <!-- Job Description -->
    <div v-if="jobAd" class="q-mt-md">
      <div class="text-h6">Job Description</div>
      <div
        class="text-body1"
        v-for="(item, index) in jobDescriptions"
        :key="index"
      >
        <div v-for="(descItem, descIndex) in item" :key="descIndex">
          <div v-if="descItem" class="text-bold q-mt-sm">{{ descItem.name }}</div>
          <div v-if="descItem" class="q-mt-sm" v-html="descItem.value" />
        </div>
      </div>
    </div>

    <!-- Approve or Reject Action -->
    <div class="q-mt-md">
      <q-btn
        v-if="jobAd"
        flat
        @click="handleModerateJobAd('Approve')"
        icon="check"
        color="positive"
      />
      <q-btn
        v-if="jobAd"
        flat
        @click="handleModerateJobAd('Reject')"
        icon="close"
        color="negative"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useJobAdStore } from 'src/stores/job-ad-store';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';

interface JobDescriptionItem {
  name: string;
  value: string;
}

const $route = useRoute();
const $router = useRouter();
const jobAdStore = useJobAdStore();

const jobAd = computed(() => jobAdStore.jobAdForModeration);

const jobDescriptions = computed<JobDescriptionItem[][]>(() => {
  if (!jobAd.value) return [];
  try {
    const metadata = JSON.parse(jobAd.value.metadata);
    return metadata.jobDescriptions as JobDescriptionItem[][];
  } catch {
    return [];
  }
});

onMounted(async () => {
  await jobAdStore.fetchJobAdForModeration(Number($route.params.id), $route.query.token as string);
});

const handleModerateJobAd = async (action: 'Approve' | 'Reject') => {
  if (!jobAd.value) return;
  await jobAdStore.moderateJobAd(jobAd.value.id, action, $route.query.token as string);
  void $router.push({ name: 'list' });
};
</script>
