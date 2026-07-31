import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { readJson } from '@/services/storage'

export function shouldOpenIntro(hasSeenIntro: boolean, targetName: string | symbol | null | undefined): boolean {
  return !hasSeenIntro && targetName !== 'intro'
}

const placeholder = () => import('@/views/ComingSoonView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/intro', name: 'intro', component: () => import('@/views/IntroView.vue') },
    { path: '/map', name: 'map', component: placeholder },
    { path: '/places', name: 'places', component: () => import('@/views/PlacesView.vue') },
    { path: '/places/:slug', name: 'place-detail', component: () => import('@/views/PlaceDetailView.vue') },
    { path: '/photo-guide', name: 'photo-guide', component: placeholder },
    { path: '/highlights', name: 'highlights', component: placeholder },
    { path: '/footprints', name: 'footprints', component: placeholder },
    { path: '/preparation', name: 'preparation', component: placeholder },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
  ],
})

router.beforeEach((to) => {
  const hasSeenIntro = readJson<boolean>('westward:v1:intro-seen', false) === true
  if (shouldOpenIntro(hasSeenIntro, to.name)) {
    return { name: 'intro', query: { to: to.fullPath } }
  }
  return true
})

export default router
