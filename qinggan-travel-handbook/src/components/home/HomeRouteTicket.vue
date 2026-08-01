<script setup lang="ts">
import { Check, Leaf, Star } from '@lucide/vue'
import { placeById } from '@/data/places'
import { scenicImagesFor } from '@/data/scenicImages'
import type { HomeJourneyRoute } from '@/types/content'
import { publicAssetUrl } from '@/lib/publicAssets'

const props = defineProps<{
  route: HomeJourneyRoute
  selected: boolean
}>()

defineEmits<{ select: [] }>()

const highlights = props.route.highlightPlaceIds.map((placeId) => {
  const place = placeById.get(placeId)!
  return { place, image: scenicImagesFor(placeId)[0] }
})
</script>

<template>
  <button
    type="button"
    class="route-ticket"
    :class="[`route-ticket--${route.tone}`, { 'is-selected': selected }]"
    data-home-route-ticket
    :data-route-id="route.id"
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <span class="route-ticket__rail" aria-hidden="true"></span>
    <span class="route-ticket__topline">
      <span class="route-ticket__position">
        <Star v-if="route.tone === 'gold'" :size="16" fill="currentColor" />
        <Leaf v-else :size="16" fill="currentColor" />
        {{ route.positioning }}
      </span>
      <span v-if="selected" class="route-ticket__selected"><Check :size="14" />当前路线</span>
    </span>
    <strong>{{ route.name }}</strong>
    <span class="route-ticket__tagline">{{ route.tagline }}</span>
    <span class="route-ticket__tags">
      <i v-for="tag in route.tags" :key="tag">{{ tag }}</i>
    </span>
    <span class="route-ticket__gallery" aria-hidden="true">
      <span v-for="item in highlights" :key="item.place.id">
        <img v-if="item.image" :src="publicAssetUrl(item.image.thumbnail)" :alt="item.image.alt" loading="lazy" />
        <i v-else></i>
        <small>{{ item.place.name }}</small>
      </span>
    </span>
    <span class="route-ticket__footer">
      <small>{{ route.durationHint }}</small>
      <b>{{ selected ? '正在地图上展开' : '切换查看' }}</b>
    </span>
  </button>
</template>

<style scoped>
.route-ticket {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 204px;
  gap: 7px;
  padding: 16px 18px 14px 22px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 22px;
  color: var(--ink);
  text-align: left;
  background: rgb(250 244 233 / 76%);
  box-shadow: 0 12px 28px rgb(62 47 36 / 7%);
  cursor: pointer;
  transition: border-color 180ms ease, transform 180ms ease, background 180ms ease;
}

.route-ticket:hover,
.route-ticket:focus-visible { transform: translateY(-2px); }
.route-ticket--gold { --ticket-accent: #c38a2f; }
.route-ticket--green { --ticket-accent: #6f875f; }
.route-ticket.is-selected { border-color: color-mix(in srgb, var(--ticket-accent) 66%, var(--line)); background: #fbf5e9; }

.route-ticket__rail {
  position: absolute;
  top: 18px;
  bottom: 18px;
  left: 0;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--ticket-accent);
}

.route-ticket__topline,
.route-ticket__position,
.route-ticket__selected,
.route-ticket__footer {
  display: flex;
  align-items: center;
}

.route-ticket__topline,
.route-ticket__footer { justify-content: space-between; gap: 10px; }
.route-ticket__position { gap: 6px; color: var(--ticket-accent); font-size: .72rem; font-weight: 700; letter-spacing: .08em; }
.route-ticket__selected { gap: 4px; color: var(--lake); font-size: .68rem; }
.route-ticket > strong { font: 700 clamp(1.35rem, 3vw, 1.8rem)/1.15 var(--serif); }
.route-ticket__tagline { color: var(--muted); font-size: .85rem; }
.route-ticket__tags { display: flex; flex-wrap: wrap; gap: 6px; }
.route-ticket__tags i { padding: 5px 8px; border-radius: 999px; color: var(--ticket-accent); background: color-mix(in srgb, var(--ticket-accent) 11%, transparent); font-size: .66rem; font-style: normal; }

.route-ticket__gallery { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
.route-ticket__gallery > span { position: relative; height: 46px; overflow: hidden; border-radius: 10px; background: #d9c9ad; }
.route-ticket__gallery img { width: 100%; height: 100%; object-fit: cover; }
.route-ticket__gallery small { position: absolute; right: 4px; bottom: 4px; left: 4px; overflow: hidden; color: #fff; font-size: .56rem; text-overflow: ellipsis; text-shadow: 0 1px 3px rgb(0 0 0 / 70%); white-space: nowrap; }
.route-ticket__footer { padding-top: 3px; color: var(--muted); font-size: .66rem; }
.route-ticket__footer b { color: var(--ticket-accent); font-weight: 700; }

@media (max-width: 719px) {
  .route-ticket { min-width: 276px; min-height: 218px; }
}
</style>
