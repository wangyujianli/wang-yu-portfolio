<script setup lang="ts">
import { combinationById } from '@/data/combinations'
import type { Place } from '@/types/content'

defineProps<{ place: Place }>()
</script>

<template>
  <section v-if="place.nearbyCombinationIds.length" class="combination-section">
    <p class="eyebrow">可以顺路安排</p>
    <h2>把相邻风景连成一段</h2>
    <article v-for="id in place.nearbyCombinationIds" :key="id">
      <template v-if="combinationById.get(id)">
        <h3>{{ combinationById.get(id)!.title }}</h3>
        <p>{{ combinationById.get(id)!.note }}</p>
        <small>{{ combinationById.get(id)!.pacing }}</small>
      </template>
    </article>
  </section>
</template>

<style scoped>
.combination-section {
  margin-top: 30px;
  padding: clamp(26px, 5vw, 42px);
  border: 1px solid var(--line);
  border-radius: 28px;
  background: rgb(255 255 255 / 36%);
}

.combination-section h2 { max-width: 760px; margin-bottom: 22px; font-size: clamp(1.8rem, 3.2vw, 3rem); }
.combination-section p { margin: 0; color: var(--muted); }
.combination-section article { margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--line); }
.combination-section small { display: block; margin-top: 8px; color: var(--sunset); }
</style>
