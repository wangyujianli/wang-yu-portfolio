<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, MapPin } from '@lucide/vue'
import { useRoute } from 'vue-router'
import PlaceFacts from '@/components/place/PlaceFacts.vue'
import PlaceSections from '@/components/place/PlaceSections.vue'
import PlaceValueOverview from '@/components/place/PlaceValueOverview.vue'
import VisitedToggle from '@/components/common/VisitedToggle.vue'
import WeatherPanel from '@/components/weather/WeatherPanel.vue'
import { placeBySlug } from '@/data/places'

const route = useRoute()
const place = computed(() => placeBySlug.get(String(route.params.slug)))

function hideBrokenImage(event: Event): void {
  const image = event.currentTarget
  if (image instanceof HTMLImageElement) image.hidden = true
}
</script>

<template>
  <main v-if="place" class="place-detail page-shell">
    <RouterLink to="/places" class="back-link"><ArrowLeft :size="19" />返回地点指南</RouterLink>

    <section class="place-hero" :data-tone="place.visualTone">
      <div class="place-hero__visual">
        <img :src="place.image" :alt="place.imageAlt" decoding="async" fetchpriority="high" @error="hideBrokenImage" />
        <i></i><i></i><span>{{ String(place.routeOrder).padStart(2, '0') }}</span>
      </div>
      <div class="place-hero__copy">
        <p class="eyebrow">{{ place.category }} · PLACE FILE {{ String(place.routeOrder).padStart(2, '0') }}</p>
        <h1>{{ place.name }}</h1>
        <p class="place-hero__region"><MapPin :size="17" />{{ place.region }}</p>
        <p class="place-hero__summary">{{ place.summary }}</p>
      </div>
    </section>

    <PlaceValueOverview :place="place" />
    <WeatherPanel class="place-weather" :place-id="place.id" :coordinates="place.weatherCoordinates" />

    <section class="place-layout">
      <PlaceFacts :place="place" />
      <PlaceSections :place="place" />
    </section>

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
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 32px;
  background: rgb(255 255 255 / 42%);
  box-shadow: var(--shadow);
}

.place-hero__visual {
  position: relative;
  min-height: 280px;
  overflow: hidden;
  background: linear-gradient(160deg, #91b5c1 0 43%, #d8b16f 44% 62%, #79503f 63%);
}

.place-hero__visual img {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.place-hero__visual::after {
  position: absolute;
  z-index: 2;
  inset: 0;
  background: linear-gradient(180deg, transparent 42%, rgb(38 31 27 / 30%) 100%);
  content: '';
  pointer-events: none;
}

.place-hero[data-tone='lake'] .place-hero__visual,
.place-hero[data-tone='salt'] .place-hero__visual,
.place-hero[data-tone='emerald'] .place-hero__visual { background: linear-gradient(165deg, #8ab6c5 0 42%, #e7e2cf 43% 52%, #3d8b87 53% 73%, #a38d68 74%); }
.place-hero[data-tone='danxia'] .place-hero__visual,
.place-hero[data-tone='sunset'] .place-hero__visual,
.place-hero[data-tone='dunhuang'] .place-hero__visual { background: linear-gradient(160deg, #8eacb7 0 36%, #d1985c 37% 50%, #ae6242 51% 67%, #59433a 68%); }
.place-hero[data-tone='grass'] .place-hero__visual,
.place-hero[data-tone='flower'] .place-hero__visual { background: linear-gradient(164deg, #8bafbb 0 36%, #eee7d6 37% 45%, #8da06f 46% 65%, #d7af42 66%); }

.place-hero__visual i {
  position: absolute;
  right: -10%;
  bottom: -24%;
  width: 80%;
  height: 72%;
  border-radius: 70% 0 0;
  background: rgb(53 42 36 / 16%);
  transform: rotate(-9deg);
}

.place-hero__visual i:nth-child(2) {
  right: auto;
  bottom: -40%;
  left: -8%;
  background: rgb(255 255 255 / 16%);
  transform: rotate(12deg);
}

.place-hero__visual span {
  position: absolute;
  z-index: 3;
  top: 22px;
  right: 24px;
  color: rgb(255 255 255 / 72%);
  font: 700 5rem/1 var(--serif);
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

.place-layout {
  display: grid;
  gap: 28px;
  margin-top: 36px;
}

.place-weather {
  margin-top: 28px;
}

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
  .place-hero { grid-template-columns: 1.08fr 0.92fr; min-height: 520px; }
  .place-hero__visual { min-height: 100%; }
  .place-hero__copy { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 44px; }
  .place-layout { grid-template-columns: minmax(240px, 0.34fr) minmax(0, 1fr); align-items: start; }
  .place-layout :deep(.place-facts) { position: sticky; top: 94px; }
}
</style>
