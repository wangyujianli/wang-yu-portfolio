<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, X } from '@lucide/vue'
import VisitedToggle from '@/components/common/VisitedToggle.vue'
import type { Place } from '@/types/content'
import { scenicImagesFor } from '@/data/scenicImages'
import { publicAssetUrl } from '@/lib/publicAssets'

const props = defineProps<{ place: Place }>()
defineEmits<{ close: [] }>()
const scenic = computed(() => scenicImagesFor(props.place.id)[0])
</script>

<template>
  <article class="map-place-sheet paper-card">
    <button type="button" class="map-place-sheet__close" aria-label="关闭地点卡片" @click="$emit('close')"><X :size="19" /></button>
    <p class="eyebrow">PLACE {{ String(place.routeOrder).padStart(2, '0') }} · {{ place.category }}</p>
    <h2>{{ place.name }}</h2>
    <div class="map-place-sheet__reason">
      <span>为什么值得停下来</span>
      <p data-map-reason>{{ place.value.reasonToVisit }}</p>
    </div>
    <dl>
      <div><dt>推荐等级</dt><dd data-priority>{{ place.value.priorityLabel }}</dd></div>
      <div><dt>建议停留</dt><dd>{{ place.suggestedDuration }}</dd></div>
    </dl>
    <div class="map-place-sheet__actions">
      <RouterLink :to="`/places/${place.slug}`" class="button-primary">查看完整攻略 <ArrowUpRight :size="18" /></RouterLink>
      <VisitedToggle :place-id="place.id" compact />
    </div>
    <img
      v-if="scenic"
      class="map-place-sheet__image"
      :src="publicAssetUrl(scenic.thumbnail)"
      :alt="scenic.alt"
      loading="lazy"
      decoding="async"
    />
  </article>
</template>

<style scoped>
.map-place-sheet {
  position: relative;
  padding: 24px;
}

.map-place-sheet__image {
  display: block;
  width: 100%;
  height: clamp(110px, 18vw, 180px);
  margin-top: 20px;
  border-radius: 18px;
  object-fit: cover;
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

.map-place-sheet__reason > span { color: var(--sunset); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; }
.map-place-sheet__reason p { margin: 8px 0 0; color: var(--muted); font-size: 0.88rem; line-height: 1.75; }
.map-place-sheet dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 22px 0; }
.map-place-sheet dl div { padding: 13px; border: 1px solid var(--line); border-radius: 14px; }
.map-place-sheet dt { color: var(--muted); font-size: 0.72rem; }
.map-place-sheet dd { margin: 5px 0 0; font-size: 0.86rem; font-weight: 700; }
.map-place-sheet [data-priority] { color: var(--sunset); }
.map-place-sheet__actions { display: flex; flex-wrap: wrap; gap: 9px; }
</style>
