<script setup lang="ts">
import { Camera, CarFront, CloudSun, ContactRound, HeartPulse, Shirt, SunMedium, UtensilsCrossed } from '@lucide/vue'
import type { Component } from 'vue'
import type { TravelPreparationGuide } from '@/types/content'

defineProps<{ guides: TravelPreparationGuide[] }>()

const icons: Record<string, Component> = {
  documents: ContactRound,
  clothing: Shirt,
  'sun-protection': SunMedium,
  'food-hydration': UtensilsCrossed,
  'health-altitude': HeartPulse,
  'vehicle-road': CarFront,
  'photography-electronics': Camera,
  'weather-control': CloudSun,
  emergency: ContactRound,
}
</script>

<template>
  <div class="travel-guides">
    <section
      v-for="(guide, index) in guides"
      :id="guide.id"
      :key="guide.id"
      class="travel-guide"
      :class="[`travel-guide--${guide.id}`, { 'travel-guide--feature': ['clothing', 'sun-protection', 'food-hydration'].includes(guide.id), 'travel-guide--reverse': index % 2 === 1 }]"
      data-preparation-guide
    >
      <header class="travel-guide__heading">
        <div class="travel-guide__stamp">
          <component :is="icons[guide.id]" :size="32" :stroke-width="1.35" />
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <div>
          <p class="eyebrow">{{ guide.eyebrow }}</p>
          <h2>{{ guide.title }}</h2>
          <p>{{ guide.intro }}</p>
        </div>
      </header>

      <div class="travel-guide__groups">
        <article v-for="group in guide.groups" :key="group.title">
          <h3>{{ group.title }}</h3>
          <ul><li v-for="item in group.items" :key="item">{{ item }}</li></ul>
          <p v-if="group.note" class="travel-guide__note">{{ group.note }}</p>
        </article>
      </div>

      <p v-if="guide.callout" class="travel-guide__callout">{{ guide.callout }}</p>
      <p v-if="guide.disclaimer" class="travel-guide__disclaimer">{{ guide.disclaimer }}</p>
    </section>
  </div>
</template>

<style scoped>
.travel-guides { display: grid; gap: 34px; }

.travel-guide {
  scroll-margin-top: 92px;
  padding: clamp(24px, 4vw, 42px);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.travel-guide--feature {
  border: 1px solid var(--line);
  border-radius: 30px;
  background: linear-gradient(145deg, rgb(255 255 255 / 48%), rgb(59 130 160 / 6%));
}

.travel-guide--clothing { background: linear-gradient(145deg, rgb(255 255 255 / 54%), rgb(216 155 53 / 9%)); }
.travel-guide--sun-protection { background: linear-gradient(145deg, rgb(255 255 255 / 54%), rgb(169 68 58 / 7%)); }
.travel-guide__heading { display: grid; gap: 18px; }
.travel-guide__heading h2 { margin: 8px 0 14px; font-size: clamp(2.1rem, 5vw, 4.5rem); line-height: 1.08; }
.travel-guide__heading > div:last-child > p:last-child { max-width: 760px; margin: 0; color: var(--muted); font-size: 1rem; line-height: 1.85; }

.travel-guide__stamp {
  display: flex;
  width: 86px;
  min-height: 102px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px dashed var(--sunset);
  border-radius: 50% 46% 48% 44%;
  color: var(--sunset);
  transform: rotate(-3deg);
}
.travel-guide__stamp span { font: 700 .74rem/1 var(--serif); letter-spacing: .12em; }
.travel-guide__groups { display: grid; gap: 14px; margin-top: 28px; }
.travel-guide__groups article { padding: 20px; border-left: 2px solid var(--lake); background: rgb(255 255 255 / 32%); }
.travel-guide__groups h3 { margin: 0 0 12px; font-size: 1.25rem; }
.travel-guide__groups ul { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 9px 22px; margin: 0; padding-left: 1.2rem; color: var(--muted); }
.travel-guide__note { margin: 13px 0 0; padding-top: 12px; border-top: 1px dashed var(--line); color: var(--ink); font-size: .84rem; }
.travel-guide__callout { margin: 22px 0 0; padding: 17px 20px; border-radius: 16px; color: #6f4d22; background: rgb(216 155 53 / 12%); font-weight: 700; }
.travel-guide__disclaimer { margin: 22px 0 0; color: var(--muted); font-size: .82rem; }

@media (min-width: 780px) {
  .travel-guide__heading { grid-template-columns: 104px minmax(0, 1fr); align-items: start; }
  .travel-guide__groups { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-left: 122px; }
  .travel-guide__callout,
  .travel-guide__disclaimer { margin-left: 122px; }
  .travel-guide--reverse .travel-guide__heading { grid-template-columns: minmax(0, 1fr) 104px; }
  .travel-guide--reverse .travel-guide__heading > div:last-child { grid-column: 1; grid-row: 1; }
  .travel-guide--reverse .travel-guide__stamp { grid-column: 2; }
  .travel-guide--reverse .travel-guide__groups,
  .travel-guide--reverse .travel-guide__callout,
  .travel-guide--reverse .travel-guide__disclaimer { margin-right: 122px; margin-left: 0; }
}

@media (max-width: 719px) {
  .travel-guide { padding-inline: 18px; }
  .travel-guide__groups ul { grid-template-columns: 1fr; }
}
</style>
