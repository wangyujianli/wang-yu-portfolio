import { createRouter, createWebHistory } from 'vue-router'

const placeholder = () => import('@/views/ComingSoonView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: placeholder },
    { path: '/intro', name: 'intro', component: placeholder },
    { path: '/map', name: 'map', component: placeholder },
    { path: '/places', name: 'places', component: placeholder },
    { path: '/places/:slug', name: 'place-detail', component: placeholder },
    { path: '/photo-guide', name: 'photo-guide', component: placeholder },
    { path: '/highlights', name: 'highlights', component: placeholder },
    { path: '/footprints', name: 'footprints', component: placeholder },
    { path: '/preparation', name: 'preparation', component: placeholder },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: placeholder },
  ],
})

export default router
