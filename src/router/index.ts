import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'workflow',
      component: () => import('../views/WorkflowView.vue'),
    },
    {
      path: '/workflow/create',
      name: 'workflow-create',
      component: () => import('../views/WorkflowCreateView.vue'),
    },
  ],
})

export default router
