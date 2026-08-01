import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export function shouldOpenIntro(hasSeenIntro: boolean, targetName: string | symbol | null | undefined): boolean {
  void hasSeenIntro
  void targetName
  return false
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/amap-minimal-test', name: 'amap-minimal-test', component: () => import('@/views/AmapMinimalTestView.vue') },
    { path: '/map', name: 'map', component: () => import('@/views/MapView.vue') },
    { path: '/places', name: 'places', component: () => import('@/views/PlacesView.vue') },
    { path: '/places/:slug', name: 'place-detail', component: () => import('@/views/PlaceDetailView.vue') },
    { path: '/photo-guide', name: 'photo-guide', component: () => import('@/views/PhotoGuideView.vue') },
    { path: '/itinerary', name: 'itinerary', component: () => import('@/views/ItineraryView.vue') },
    { path: '/nearby', name: 'nearby', component: () => import('@/views/NearbyView.vue') },
    { path: '/highlights', name: 'highlights', component: () => import('@/views/HighlightsView.vue') },
    { path: '/footprints', name: 'footprints', component: () => import('@/views/FootprintsView.vue') },
    { path: '/preparation', name: 'preparation', component: () => import('@/views/PreparationView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
  ],
})

export default router
