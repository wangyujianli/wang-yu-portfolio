<script setup lang="ts">
import { ArrowUpRight, X } from '@lucide/vue'
import VisitedToggle from '@/components/common/VisitedToggle.vue'
import type { Place } from '@/types/content'

defineProps<{ place: Place }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <article class="map-place-sheet paper-card">
    <button type="button" class="map-place-sheet__close" aria-label="关闭地点卡片" @click="$emit('close')"><X :size="19" /></button>
    <p class="eyebrow">PLACE {{ String(place.routeOrder).padStart(2, '0') }} · {{ place.category }}</p>
    <h2>{{ place.name }}</h2>
    <p>{{ place.summary }}</p>
    <dl>
      <div><dt>建议停留</dt><dd>{{ place.suggestedDuration }}</dd></div>
      <div><dt>观赏时段</dt><dd>{{ place.bestViewingTime }}</dd></div>
    </dl>
    <div class="map-place-sheet__actions">
      <RouterLink :to="`/places/${place.slug}`" class="button-primary">打开地点页 <ArrowUpRight :size="18" /></RouterLink>
      <VisitedToggle :place-id="place.id" compact />
    </div>
  </article>
</template>

<style scoped>
.map-place-sheet {
  position: relative;
  padding: 24px;
}

.map-place-sheet__close {
  position: absolute;
  top: 12px;
  right: 12px;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: var(--muted);
  background: rgb(255 255 255 / 46%);
  cursor: pointer;
}

.map-place-sheet h2 {
  margin: 10px 40px 10px 0;
  font-size: clamp(2rem, 5vw, 3.2rem);
}

.map-place-sheet > p:not(.eyebrow) { color: var(--muted); }
.map-place-sheet dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 22px 0; }
.map-place-sheet dl div { padding: 13px; border: 1px solid var(--line); border-radius: 14px; }
.map-place-sheet dt { color: var(--muted); font-size: 0.72rem; }
.map-place-sheet dd { margin: 5px 0 0; font-size: 0.82rem; font-weight: 700; }
.map-place-sheet__actions { display: flex; flex-wrap: wrap; gap: 9px; }
</style>
