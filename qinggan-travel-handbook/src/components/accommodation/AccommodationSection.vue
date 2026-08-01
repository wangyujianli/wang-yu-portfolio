<script setup lang="ts">
import { computed, ref } from 'vue'
import { BedDouble, Compass, MapPinned } from '@lucide/vue'
import AccommodationCard from '@/components/accommodation/AccommodationCard.vue'
import AccommodationDrawer from '@/components/accommodation/AccommodationDrawer.vue'
import { accommodationHubById } from '@/data/accommodationHubs'
import type { Accommodation, Place } from '@/types/content'

const props = defineProps<{ place: Place }>()
const selectedAccommodation = ref<Accommodation | null>(null)
const hub = computed(() => accommodationHubById.get(props.place.accommodationHubId))
</script>

<template>
  <section v-if="hub" class="accommodation-section" data-accommodation-section>
    <header class="accommodation-section__header">
      <div>
        <p class="eyebrow"><BedDouble :size="17" />STAY NEARBY · {{ hub.name }}</p>
        <h2>附近住哪里更合适</h2>
      </div>
      <p>只比较位置、舒适度与自驾便利，不考虑价格，也不替旅人安排入住节奏。</p>
    </header>

    <aside v-if="place.remoteStayAdvice" class="remote-stay-notice" data-remote-stay-notice>
      <Compass :size="24" />
      <div>
        <strong>这里更适合作为沿途游览点，建议在相邻城市或成熟住宿节点休息。</strong>
        <dl>
          <div><dt>建议住宿城市</dt><dd>{{ place.remoteStayAdvice.suggestedCity }}</dd></div>
          <div><dt>大致方向或车程</dt><dd>{{ place.remoteStayAdvice.travelText }}</dd></div>
        </dl>
        <p>{{ place.remoteStayAdvice.reason }}</p>
      </div>
    </aside>

    <p v-if="hub.remoteStayNotice" class="accommodation-section__route-note"><MapPinned :size="18" />{{ hub.remoteStayNotice }}</p>

    <div class="accommodation-section__cards" aria-label="住宿选择，手机端可横向滑动">
      <AccommodationCard
        v-for="item in hub.accommodations"
        :key="item.id"
        :accommodation="item"
        @select="selectedAccommodation = $event"
      />
    </div>

    <p class="accommodation-section__footnote">住宿资料会随开放季节与运营调整；停车、供氧、空调、早餐和具体房型以预订前回复为准。</p>

    <AccommodationDrawer :accommodation="selectedAccommodation" @close="selectedAccommodation = null" />
  </section>
</template>

<style scoped>
.accommodation-section {
  margin-top: 38px;
  padding: clamp(24px, 5vw, 48px);
  overflow: hidden;
  border: 1px solid rgb(84 66 52 / 16%);
  border-radius: 30px;
  background:
    radial-gradient(circle at 92% 8%, rgb(98 148 151 / 17%), transparent 27%),
    linear-gradient(145deg, rgb(250 245 235 / 93%), rgb(235 222 199 / 78%));
  box-shadow: var(--shadow);
}

.accommodation-section__header { display: grid; gap: 14px; margin-bottom: 24px; }
.accommodation-section__header .eyebrow { display: flex; align-items: center; gap: 7px; }
.accommodation-section__header h2 { margin: 8px 0 0; font-size: clamp(2rem, 5vw, 4rem); }
.accommodation-section__header > p { max-width: 590px; margin: 0; color: var(--muted); font-size: 0.96rem; line-height: 1.75; }

.remote-stay-notice {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 13px;
  margin-bottom: 22px;
  padding: 20px;
  border-left: 4px solid var(--sunset);
  border-radius: 4px 18px 18px 4px;
  color: #fff;
  background: #6a4b3d;
}

.remote-stay-notice > svg { margin-top: 2px; color: #f3c68f; }
.remote-stay-notice strong { line-height: 1.65; }
.remote-stay-notice dl { display: grid; gap: 10px; margin: 15px 0; }
.remote-stay-notice dl div { display: grid; gap: 2px; }
.remote-stay-notice dt { color: rgb(255 255 255 / 62%); font-size: 0.7rem; letter-spacing: 0.08em; }
.remote-stay-notice dd { margin: 0; font-size: 0.88rem; }
.remote-stay-notice p { margin: 0; color: rgb(255 255 255 / 72%); font-size: 0.85rem; line-height: 1.7; }

.accommodation-section__route-note { display: flex; align-items: flex-start; gap: 8px; margin: 0 0 20px; padding: 13px 15px; border-radius: 13px; color: #5e5148; background: rgb(255 255 255 / 52%); font-size: 0.82rem; }
.accommodation-section__route-note svg { flex: 0 0 auto; margin-top: 2px; color: var(--lake); }

.accommodation-section__cards {
  display: flex;
  width: calc(100% + clamp(24px, 5vw, 48px));
  overflow-x: auto;
  gap: 14px;
  padding: 2px clamp(24px, 5vw, 48px) 14px 2px;
  scroll-padding-inline: 2px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgb(99 78 62 / 30%) transparent;
}

.accommodation-section__footnote { margin: 14px 0 0; color: var(--muted); font-size: 0.74rem; line-height: 1.65; }

@media (min-width: 720px) {
  .accommodation-section__header { grid-template-columns: minmax(0, 1fr) minmax(280px, 0.62fr); align-items: end; }
  .accommodation-section__header > p { justify-self: end; }
  .remote-stay-notice dl { grid-template-columns: 1fr 2fr; }
  .accommodation-section__cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); width: auto; overflow: visible; padding: 2px 0; }
}

@media (min-width: 720px) and (max-width: 1000px) {
  .accommodation-section { padding: 28px; }
  .accommodation-section__cards { gap: 10px; }
}
</style>
