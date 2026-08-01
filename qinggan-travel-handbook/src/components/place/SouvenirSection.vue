<script setup lang="ts">
import { ChevronDown, PackageOpen, Stamp } from '@lucide/vue'
import { souvenirCarryingNote } from '@/data/souvenirs'
import type { Place, PlaceModuleLevel } from '@/types/content'

defineProps<{ place: Place; level: Exclude<PlaceModuleLevel, 'hidden'> }>()
</script>

<template>
  <section class="souvenir-section editorial-module" data-module="souvenir" :data-module-level="level">
    <header>
      <p class="eyebrow"><Stamp :size="17" />TAKE A MEMORY · 轻装带走</p>
      <h2>有什么适合带走</h2>
      <p>{{ place.souvenirs?.intro }}</p>
    </header>

    <div class="souvenir-section__items">
      <article
        v-for="item in (level === 'compact' ? place.souvenirs?.recommendations.slice(0, 1) : place.souvenirs?.recommendations)"
        :key="item.id"
      >
        <PackageOpen :size="23" :stroke-width="1.45" />
        <span>{{ item.type }}</span>
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <strong>{{ item.whyBuy }}</strong>
        <small>{{ item.buyingAdvice }}</small>
      </article>
    </div>

    <details v-if="level === 'compact' && (place.souvenirs?.recommendations.length ?? 0) > 1" data-compact-expand>
      <summary>展开其余建议 <ChevronDown :size="17" /></summary>
      <p v-for="item in place.souvenirs?.recommendations.slice(1)" :key="item.id"><strong>{{ item.name }}</strong> · {{ item.buyingAdvice }}</p>
    </details>
    <footer>{{ souvenirCarryingNote }}</footer>
  </section>
</template>

<style scoped>
.souvenir-section { padding: clamp(24px, 4vw, 38px) !important; border: 1px solid var(--line) !important; border-radius: 28px; background: linear-gradient(140deg, rgb(169 68 58 / 7%), rgb(255 255 255 / 42%)); }
.souvenir-section header .eyebrow { display: flex; align-items: center; gap: 7px; }
.souvenir-section h2 { margin: 7px 0 10px; }
.souvenir-section header > p:last-child { max-width: 740px; color: var(--muted); }
.souvenir-section__items { display: grid; gap: 12px; }
.souvenir-section__items article { display: grid; align-content: start; gap: 7px; padding: 20px; border: 1px solid rgb(169 68 58 / 15%); border-radius: 18px; background: rgb(255 255 255 / 32%); }
.souvenir-section__items svg { color: var(--sunset); }
.souvenir-section__items span { color: var(--sunset); font-size: .7rem; font-weight: 700; letter-spacing: .08em; }
.souvenir-section__items h3 { margin: 0; font-size: 1.28rem; }
.souvenir-section__items p { margin: 0; color: var(--muted); }
.souvenir-section__items strong { margin-top: 5px; font-size: .88rem; }
.souvenir-section__items small { color: var(--muted); }
.souvenir-section details { margin-top: 14px; }
.souvenir-section summary { display: flex; min-height: 44px; align-items: center; justify-content: space-between; padding: 0 14px; border: 1px solid var(--line); border-radius: 13px; cursor: pointer; }
.souvenir-section details p { color: var(--muted); }
.souvenir-section footer { margin-top: 18px; padding-top: 15px; border-top: 1px dashed var(--line); color: var(--muted); font-size: .8rem; }
.souvenir-section[data-module-level='primary'] h2 { font-size: clamp(2.6rem, 5vw, 4.5rem); }

@media (min-width: 720px) {
  .souvenir-section__items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .souvenir-section[data-module-level='primary'] .souvenir-section__items { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
