<script setup lang="ts">
import { ArrowUpRight, MapPin } from '@lucide/vue'
import VisitedToggle from '@/components/common/VisitedToggle.vue'
import type { Place } from '@/types/content'

withDefaults(defineProps<{ place: Place; featured?: boolean }>(), { featured: false })
</script>

<template>
  <article class="place-card paper-card" :class="{ 'place-card--featured': featured }" :data-tone="place.visualTone">
    <div class="place-card__visual" aria-hidden="true">
      <span class="place-card__number">{{ String(place.routeOrder).padStart(2, '0') }}</span>
      <i></i><i></i><i></i>
    </div>
    <div class="place-card__body">
      <div class="place-card__meta">
        <span>{{ place.category }}</span>
        <span class="place-card__region"><MapPin :size="14" />{{ place.region }}</span>
      </div>
      <h3>{{ place.name }}</h3>
      <p>{{ place.summary }}</p>
      <div class="place-card__footer">
        <RouterLink :to="`/places/${place.slug}`" class="place-card__link">
          展开这一页 <ArrowUpRight :size="18" />
        </RouterLink>
        <VisitedToggle :place-id="place.id" compact />
      </div>
    </div>
  </article>
</template>

<style scoped>
.place-card {
  position: relative;
  display: grid;
  min-height: 360px;
  overflow: hidden;
}

.place-card__visual {
  position: relative;
  min-height: 170px;
  overflow: hidden;
  background:
    radial-gradient(circle at 72% 24%, rgb(255 248 213 / 78%) 0 9%, transparent 10%),
    linear-gradient(155deg, #8db4bf 0 45%, #d5a15c 46% 64%, #745647 65%);
}

.place-card[data-tone='lake'] .place-card__visual,
.place-card[data-tone='salt'] .place-card__visual,
.place-card[data-tone='emerald'] .place-card__visual {
  background: linear-gradient(165deg, #8eb9c8 0 42%, #e8e3d1 43% 54%, #3f8b87 55% 72%, #b9a986 73%);
}

.place-card[data-tone='danxia'] .place-card__visual,
.place-card[data-tone='sunset'] .place-card__visual,
.place-card[data-tone='dunhuang'] .place-card__visual {
  background: linear-gradient(156deg, #91afbd 0 38%, #d49a62 39% 50%, #a96043 51% 65%, #59453d 66%);
}

.place-card[data-tone='grass'] .place-card__visual,
.place-card[data-tone='flower'] .place-card__visual {
  background: linear-gradient(162deg, #8badbb 0 36%, #e9e2cf 37% 45%, #95a36f 46% 64%, #d4ad48 65%);
}

.place-card[data-tone='wall'] .place-card__visual,
.place-card[data-tone='brick'] .place-card__visual,
.place-card[data-tone='cinema'] .place-card__visual {
  background: linear-gradient(160deg, #91a9ae 0 38%, #b88b63 39% 66%, #604940 67%);
}

.place-card__visual i {
  position: absolute;
  right: -12%;
  bottom: -20%;
  width: 68%;
  height: 72%;
  border-radius: 60% 0 0;
  background: rgb(53 42 36 / 14%);
  transform: rotate(-7deg);
}

.place-card__visual i:nth-of-type(2) {
  right: 18%;
  bottom: -42%;
  background: rgb(255 255 255 / 18%);
  transform: rotate(11deg);
}

.place-card__visual i:nth-of-type(3) {
  right: auto;
  bottom: -52%;
  left: -10%;
  background: rgb(53 42 36 / 10%);
}

.place-card__number {
  position: absolute;
  z-index: 2;
  top: 16px;
  right: 18px;
  color: rgb(255 255 255 / 82%);
  font: 700 2.4rem/1 var(--serif);
}

.place-card__body {
  display: flex;
  flex-direction: column;
  padding: 22px;
}

.place-card__meta,
.place-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.place-card__meta {
  color: var(--sunset);
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.place-card__region {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--muted);
  font-weight: 400;
  letter-spacing: 0;
}

.place-card h3 {
  margin: 13px 0 10px;
  font-size: 1.55rem;
}

.place-card p {
  flex: 1;
  color: var(--muted);
  font-size: 0.92rem;
}

.place-card__footer {
  align-items: end;
  margin-top: 12px;
}

.place-card__link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 6px;
  color: var(--lake);
  font-weight: 700;
  text-decoration: none;
}

@media (min-width: 720px) {
  .place-card--featured {
    grid-template-columns: minmax(0, 1.15fr) minmax(290px, 0.85fr);
  }

  .place-card--featured .place-card__visual {
    min-height: 100%;
  }
}
</style>
