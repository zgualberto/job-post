import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'list', component: () => import('pages/IndexPage.vue') },
      { path: ':id', name: 'show', component: () => import('pages/ShowPage.vue') },
      { path: 'create', name: 'create', component: () => import('pages/CreateJobAdPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
