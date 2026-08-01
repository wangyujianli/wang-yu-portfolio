<script setup lang="ts">
import { ChevronDown, MapPin, Soup } from '@lucide/vue'
import type { Place, PlaceModuleLevel } from '@/types/content'

defineProps<{ place: Place; level: Exclude<PlaceModuleLevel, 'hidden'> }>()
</script>

<template>
  <section class="food-section editorial-module" data-module="food" :data-module-level="level">
    <header>
      <div>
        <p class="eyebrow"><Soup :size="17" />LOCAL FLAVOUR · 不排餐厅榜</p>
        <h2>附近有什么值得尝</h2>
      </div>
      <p>只提供当地风味参考，不替旅人安排具体餐厅。</p>
    </header>

    <p class="food-section__intro">{{ place.localFood?.intro }}</p>
    <p v-if="place.localFood?.nearbyFoodHub" class="food-section__hub"><MapPin :size="17" />{{ place.localFood.nearbyFoodHub }}</p>

    <div v-if="place.localFood?.recommendations.length" class="food-section__items">
      <article
        v-for="item in (level === 'compact' ? place.localFood.recommendations.slice(0, 1) : place.localFood.recommendations)"
        :key="item.id"
      >
        <span>{{ item.category }}</span>
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <dl><div><dt>为什么试</dt><dd>{{ item.whyTry }}</dd></div><div><dt>哪里找</dt><dd>{{ item.areaToFind }}</dd></div></dl>
        <small v-if="item.caution">{{ item.caution }}</small>
      </article>
    </div>

    <details v-if="level === 'compact' && (place.localFood?.recommendations.length ?? 0) > 1" data-compact-expand>
      <summary>再看几样当地风味 <ChevronDown :size="17" /></summary>
      <div class="food-section__compact-list">
        <article v-for="item in place.localFood?.recommendations.slice(1)" :key="item.id">
          <strong>{{ item.name }}</strong><span>{{ item.description }}</span>
        </article>
      </div>
    </details>
  </section>
</template>

<style scoped>
.food-section { padding: clamp(24px, 4vw, 38px) !important; border: 1px solid var(--line) !important; border-radius: 28px; background: linear-gradient(140deg, rgb(216 155 53 / 10%), rgb(255 255 255 / 44%)); }
.food-section > header { display: grid; gap: 12px; }
.food-section header .eyebrow { display: flex; align-items: center; gap: 7px; }
.food-section h2 { margin: 7px 0 0; }
.food-section header > p { max-width: 520px; margin: 0; color: var(--muted); }
.food-section__intro { max-width: 760px; color: var(--ink); font: 600 1rem/1.8 var(--serif); }
.food-section__hub { display: inline-flex; align-items: center; gap: 7px; margin: 0 0 18px; color: var(--lake); font-weight: 700; }
.food-section__items { display: grid; gap: 12px; }
.food-section__items article { padding: 20px; border-top: 1px solid rgb(138 93 40 / 24%); background: rgb(255 255 255 / 30%); }
.food-section__items article > span { color: #8a5d28; font-size: .72rem; font-weight: 700; letter-spacing: .08em; }
.food-section__items h3 { margin: 8px 0; font-size: 1.28rem; }
.food-section__items p { color: var(--muted); }
.food-section__items dl { display: grid; gap: 9px; margin: 14px 0 0; }
.food-section__items dl div { display: grid; gap: 3px; }
.food-section__items dt { color: #8a5d28; font-size: .7rem; }
.food-section__items dd { margin: 0; font-size: .86rem; }
.food-section__items small { display: block; margin-top: 12px; color: var(--muted); }
.food-section details { margin-top: 15px; }
.food-section summary { display: flex; min-height: 44px; align-items: center; justify-content: space-between; padding: 0 14px; border: 1px solid var(--line); border-radius: 13px; cursor: pointer; }
.food-section__compact-list { display: grid; gap: 8px; padding-top: 12px; }
.food-section__compact-list article { display: grid; gap: 3px; padding: 12px 14px; background: rgb(255 255 255 / 34%); }
.food-section__compact-list span { color: var(--muted); font-size: .83rem; }

.food-section[data-module-level='primary'] { border-color: rgb(216 155 53 / 38%) !important; }
.food-section[data-module-level='primary'] h2 { font-size: clamp(2.6rem, 5vw, 4.5rem); }
.food-section[data-module-level='compact'] { padding-block: 22px !important; }

@media (min-width: 720px) {
  .food-section > header { grid-template-columns: minmax(0, 1fr) minmax(260px, .6fr); align-items: end; }
  .food-section__items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .food-section[data-module-level='primary'] .food-section__items { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
