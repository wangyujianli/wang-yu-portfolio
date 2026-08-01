<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, MapPin } from '@lucide/vue'
import { useRoute } from 'vue-router'
import PlaceFacts from '@/components/place/PlaceFacts.vue'
import PlaceCombinations from '@/components/place/PlaceCombinations.vue'
import PlaceSections from '@/components/place/PlaceSections.vue'
import PlaceValueOverview from '@/components/place/PlaceValueOverview.vue'
import EcologyObservationSection from '@/components/place/EcologyObservationSection.vue'
import AccommodationSection from '@/components/accommodation/AccommodationSection.vue'
import VisitedToggle from '@/components/common/VisitedToggle.vue'
import WeatherPanel from '@/components/weather/WeatherPanel.vue'
import { weatherCheckpointForPlace } from '@/data/weatherCheckpoints'
import { placeById, placeBySlug } from '@/data/places'
import { moduleLevelFor } from '@/data/placeContentPriorities'
import ScenicGallery from '@/components/scenic/ScenicGallery.vue'
import { placeGalleryImages } from '@/data/placeGalleryImages'
import type { PlaceModule } from '@/types/content'

const route = useRoute()
const place = computed(() => placeBySlug.get(String(route.params.slug)))
const scenicImages = computed(() => place.value ? placeGalleryImages(place.value) : [])
const ecologyObservation = computed(() => place.value?.id === 'hoh-xil' ? placeById.get('tibetan-antelope') : undefined)
const weatherCheckpoint = computed(() => place.value ? weatherCheckpointForPlace(place.value.id) : undefined)
const moduleLabels: Record<PlaceModule, string> = {
  culture: '文化', landscape: '风景', geology: '地貌', ecology: '生态', photography: '旅拍',
  food: '当地风味', souvenir: '适合带走', accommodation: '住宿休整', booking: '预约',
  safety: '现场边界', health: '身体感受', road: '道路', weather: '天气', activities: '现场活动',
}
const moduleLevel = (module: PlaceModule) => place.value ? moduleLevelFor(place.value.contentPriority, module) : 'hidden'
const primaryModuleLabels = computed(() => place.value?.contentPriority.primaryModules.map((module) => moduleLabels[module]) ?? [])
</script>

<template>
  <main v-if="place" class="place-detail page-shell" :data-page-mood="place.contentPriority.pageMood">
    <RouterLink to="/places" class="back-link"><ArrowLeft :size="19" />返回地点指南</RouterLink>

    <section class="place-hero" :data-tone="place.visualTone">
      <div class="place-hero__visual">
        <ScenicGallery :images="scenicImages" :title="`${place.name}实景画廊`" />
      </div>
      <div class="place-hero__copy">
        <p class="eyebrow">{{ place.category }} · PLACE FILE {{ String(place.routeOrder).padStart(2, '0') }}</p>
        <h1>{{ place.name }}</h1>
        <p class="place-hero__region"><MapPin :size="17" />{{ place.region }}</p>
        <p class="place-hero__summary">{{ place.summary }}</p>
        <p class="place-hero__aside">{{ place.lightNote }}</p>
      </div>
    </section>

    <section
      class="editorial-theme"
      data-editorial-theme
      :data-primary-module="place.contentPriority.primaryModules[0]"
    >
      <div>
        <p class="eyebrow">{{ place.contentPriority.pageMood }} · EDITORIAL FOCUS</p>
        <h2>{{ place.contentPriority.editorialTheme }}</h2>
      </div>
      <div class="editorial-theme__modules" aria-label="这一站的内容重点">
        <span v-for="label in primaryModuleLabels" :key="label">{{ label }}</span>
      </div>
      <p v-if="place.contentPriority.editorialIntro" class="editorial-theme__alert" data-editorial-alert>{{ place.contentPriority.editorialIntro }}</p>
    </section>

    <PlaceValueOverview :place="place" />
    <EcologyObservationSection v-if="ecologyObservation" :observation-place="ecologyObservation" />
    <WeatherPanel
      v-if="moduleLevel('weather') !== 'hidden' && weatherCheckpoint"
      class="place-weather"
      data-module="weather-quick-check"
      :data-module-level="moduleLevel('weather')"
      :checkpoint="weatherCheckpoint"
    />

    <div v-if="moduleLevel('accommodation') === 'primary'" class="accommodation-shell" data-accommodation-shell data-module-level="primary">
      <AccommodationSection :place="place" />
    </div>

    <section class="place-layout">
      <PlaceFacts :place="place" />
      <PlaceSections :place="place" />
    </section>

    <div
      v-if="moduleLevel('accommodation') !== 'hidden' && moduleLevel('accommodation') !== 'primary'"
      class="accommodation-shell"
      :class="`accommodation-shell--${moduleLevel('accommodation')}`"
      data-accommodation-shell
      :data-module-level="moduleLevel('accommodation')"
    >
      <AccommodationSection :place="place" />
    </div>
    <PlaceCombinations :place="place" />

    <footer class="place-detail__footer">
      <p>这一页读完了，也可以只留下一个简单的足迹。</p>
      <VisitedToggle :place-id="place.id" />
    </footer>
  </main>

  <main v-else class="page-shell missing-place">
    <p class="eyebrow">PAGE NOT FOUND</p>
    <h1>这一页还没有收进手册</h1>
    <RouterLink class="button-primary" to="/places">返回地点指南</RouterLink>
  </main>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 7px;
  margin-bottom: 18px;
  color: var(--muted);
  text-decoration: none;
}

.place-hero {
  display: grid;
  gap: 24px;
}

.place-hero > * {
  min-width: 0;
}

.place-hero__visual {
  position: relative;
  min-height: 280px;
}

.place-hero__copy {
  padding: 28px;
}

.place-hero h1 {
  margin: 10px 0 12px;
  font-size: clamp(3rem, 9vw, 6.8rem);
}

.place-hero__region {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--sunset);
  font-size: 0.8rem;
}

.place-hero__summary {
  max-width: 660px;
  margin: 20px 0 24px;
  color: var(--muted);
  font-size: 1.05rem;
}

.place-hero__aside {
  margin: 0;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--ink);
  font-family: var(--serif);
}

.editorial-theme {
  display: grid;
  gap: 20px;
  margin: 28px 0;
  padding: clamp(24px, 4vw, 40px);
  border-block: 1px solid var(--line);
  background: linear-gradient(90deg, rgb(255 255 255 / 18%), rgb(59 130 160 / 7%), transparent);
}
.editorial-theme h2 { max-width: 920px; margin: 9px 0 0; font-size: clamp(2.2rem, 5vw, 4.9rem); line-height: 1.08; }
.editorial-theme__modules { display: flex; flex-wrap: wrap; gap: 8px; }
.editorial-theme__modules span { padding: 7px 12px; border: 1px solid var(--line); border-radius: 999px; color: var(--lake); background: rgb(255 255 255 / 34%); font-size: .78rem; font-weight: 700; }
.editorial-theme__alert { grid-column: 1 / -1; margin: 0; padding: 15px 18px; border-left: 3px solid var(--sunset); color: #754535; background: rgb(169 68 58 / 8%); font-weight: 700; }

.place-layout {
  display: grid;
  gap: 28px;
  margin-top: 36px;
}

.place-weather {
  margin-top: 28px;
}
.place-weather[data-module-level='compact'] { max-height: 290px; overflow: auto; }

.accommodation-shell[data-module-level='primary'] { margin: 30px 0 6px; }
.accommodation-shell[data-module-level='primary'] :deep(.accommodation-section) { border-color: rgb(59 130 160 / 34%); }
.accommodation-shell--compact :deep(.accommodation-section__cards [data-accommodation-card]:nth-child(n+2)) { display: none; }
.accommodation-shell--compact :deep(.accommodation-section__header > p) { display: none; }

.place-detail__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 36px;
  padding: 28px 0 18px;
  border-top: 1px solid var(--line);
}

.place-detail__footer p { margin: 0; color: var(--muted); }
.missing-place { display: grid; align-content: center; justify-items: start; }

@media (min-width: 720px) {
  .place-hero { grid-template-columns: minmax(0, 1.16fr) minmax(280px, .84fr); align-items: center; min-height: 520px; }
  .place-hero__visual { min-height: 100%; }
  .place-hero__copy { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 44px; }
  .place-layout { grid-template-columns: minmax(240px, 0.34fr) minmax(0, 1fr); align-items: start; }
  .place-layout :deep(.place-facts) { position: sticky; top: 94px; }
  .editorial-theme { grid-template-columns: minmax(0, 1fr) auto; align-items: end; }
}
</style>
