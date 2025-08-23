<template>
  <q-page>
    <div class="q-pa-md row q-gutter-sm">
      <q-card flat bordered  v-for="(jobAd, key) in jobAds" :key="key" class="col-12">
        <q-card-section>
          <div class="text-subtitle2">{{ jobAd.name }}</div>
          <div class="text-caption">
            <q-icon name="place"></q-icon>
            {{ jobAd.office }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useJobAdStore } from 'src/stores/job-ad-store';

const jobAdStore = useJobAdStore();

const jobAds = computed(() => jobAdStore.jobAds);

onMounted(async () => {
  await jobAdStore.fetchJobAds();
  console.log('Job ads fetched:', jobAds.value);
});
</script>
