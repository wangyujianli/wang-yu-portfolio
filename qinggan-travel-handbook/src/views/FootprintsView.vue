<script setup lang="ts">
import { computed } from 'vue'
import { Compass, Map } from '@lucide/vue'
import PlaceCard from '@/components/place/PlaceCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { places } from '@/data/places'
import { useVisitedStore } from '@/stores/visited'

const store = useVisitedStore()
const visitedPlaces = computed(() => places.filter((place) => store.isVisited(place.id)).sort((a, b) => a.routeOrder - b.routeOrder))
</script>

<template>
  <main class="footprints-page page-shell">
    <section class="footprints-head magazine-grid">
      <SectionHeading eyebrow="OUR TRAVEL STAMPS" title="我的足迹" intro="只记一件事：这里，我们已经去过。没有日期、文字或照片需要整理。" />
      <div class="footprint-stamp" :class="{ 'footprint-stamp--empty': store.count === 0 }">
        <span>已探索</span><strong>{{ store.count }}</strong><small>/ 16 PLACES</small>
      </div>
    </section>

    <section v-if="visitedPlaces.length" class="footprint-route">
      <div class="footprint-route__line" aria-hidden="true"></div>
      <span v-for="place in visitedPlaces" :key="place.id"><i>{{ place.routeOrder }}</i>{{ place.name }}</span>
    </section>

    <section v-if="visitedPlaces.length" class="footprints-grid">
      <PlaceCard v-for="place in visitedPlaces" :key="place.id" :place="place" />
    </section>

    <section v-else class="footprints-empty paper-card">
      <div class="footprints-empty__map" aria-hidden="true"><i></i><i></i><i></i></div>
      <p class="eyebrow">THE FIRST STAMP IS WAITING</p>
      <h2>第一枚印章还在路上</h2>
      <p>从地图或地点指南随意开始，去过以后轻轻点一下即可。</p>
      <div><RouterLink to="/map" class="button-primary"><Map :size="19" />打开地图</RouterLink><RouterLink to="/places" class="button-secondary"><Compass :size="19" />翻阅地点</RouterLink></div>
    </section>
  </main>
</template>

<style scoped>
.footprints-head { align-items: center; }
.footprints-head :deep(.section-heading) { grid-column: 1 / -1; }
.footprint-stamp { display: grid; width: 180px; aspect-ratio: 1; place-content: center; justify-self: start; border: 4px double var(--sunset); border-radius: 50%; color: var(--sunset); text-align: center; transform: rotate(-5deg); }
.footprint-stamp span { font-size: 0.76rem; font-weight: 700; letter-spacing: 0.15em; }
.footprint-stamp strong { font: 700 4.6rem/0.95 var(--serif); }
.footprint-stamp small { font-size: 0.65rem; letter-spacing: 0.1em; }
.footprint-stamp--empty { opacity: 0.46; }
.footprint-route { position: relative; display: flex; gap: 0; overflow-x: auto; margin: 38px 0; padding: 16px 0 24px; }
.footprint-route__line { position: absolute; top: 30px; right: 0; left: 0; height: 2px; background: var(--sunset); }
.footprint-route span { position: relative; z-index: 1; display: flex; min-width: 110px; flex-direction: column; align-items: center; gap: 8px; color: var(--muted); font-size: 0.76rem; }
.footprint-route i { display: grid; width: 30px; height: 30px; place-items: center; border: 3px solid var(--paper); border-radius: 50%; color: #fff; background: var(--lake); box-shadow: 0 0 0 1px var(--lake); font-style: normal; }
.footprints-grid { display: grid; gap: 20px; }
.footprints-empty { max-width: 820px; margin: 40px auto 0; padding: 34px; overflow: hidden; text-align: center; }
.footprints-empty__map { position: relative; width: min(100%, 420px); height: 180px; margin: 0 auto 24px; border-radius: 50% 42% 56% 34%; background: linear-gradient(150deg, #8fb4bd 0 44%, #d2b578 45% 66%, #8c634b 67%); opacity: 0.76; }
.footprints-empty__map i { position: absolute; width: 18px; height: 18px; border: 4px solid var(--paper); border-radius: 50%; background: var(--sunset); }
.footprints-empty__map i:nth-child(1) { top: 28%; left: 24%; }.footprints-empty__map i:nth-child(2) { top: 54%; left: 52%; }.footprints-empty__map i:nth-child(3) { top: 34%; right: 18%; }
.footprints-empty h2 { font-size: clamp(2rem, 5vw, 3.5rem); }
.footprints-empty > p:not(.eyebrow) { color: var(--muted); }
.footprints-empty > div:last-child { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 22px; }
@media (min-width: 720px) { .footprints-head :deep(.section-heading) { grid-column: 1 / span 8; } .footprint-stamp { grid-column: 10 / -1; justify-self: end; } .footprints-grid { grid-template-columns: repeat(2, 1fr); gap: 26px; } }
</style>
