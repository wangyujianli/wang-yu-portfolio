<script setup lang="ts">
import { CalendarRange, Shuffle } from '@lucide/vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import ItineraryDay from '@/components/journey/ItineraryDay.vue'
import { nineDayItinerary } from '@/data/nineDayItinerary'
</script>

<template>
  <main class="itinerary page-shell">
    <section class="itinerary__hero magazine-grid">
      <div>
        <SectionHeading eyebrow="9 DAYS · REFERENCE ONLY" title="九天参考路线" intro="把长距离车程、核心景观和天气替代先放在同一张纸上，真正出发后再按现场状态自由调节。" />
        <p class="itinerary__notice" data-itinerary-notice><Shuffle :size="20" />这是一条参考路线，可根据航班、天气、预约和体力自由调整。</p>
      </div>
      <aside><CalendarRange :size="28" /><strong>9 天只是一个好理解的折页</strong><p>地点探索始终独立可用，不会因为跳过某一天而锁住内容。</p></aside>
    </section>

    <section class="itinerary__days" aria-label="九天参考安排">
      <ItineraryDay v-for="day in nineDayItinerary" :key="day.id" :day="day" />
    </section>
  </main>
</template>

<style scoped>
.itinerary__hero { align-items: end; margin-bottom: 46px; }
.itinerary__hero > div { grid-column: 1 / -1; }
.itinerary__hero aside { grid-column: 1 / -1; padding: 24px; border: 1px solid var(--line); border-radius: 24px; color: var(--lake); background: rgb(45 127 123 / 8%); }
.itinerary__hero aside strong { display: block; margin: 12px 0 5px; font-family: var(--serif); font-size: 1.2rem; }
.itinerary__hero aside p { margin: 0; color: var(--muted); font-size: .84rem; }
.itinerary__notice { display: flex; max-width: 760px; align-items: flex-start; gap: 10px; margin-top: 20px; padding: 16px 18px; border-left: 3px solid var(--sunset); color: var(--ink); background: rgb(255 255 255 / 32%); }
.itinerary__notice svg { flex: 0 0 auto; color: var(--sunset); }
.itinerary__days { max-width: 1120px; margin-inline: auto; }

@media (min-width: 900px) {
  .itinerary__hero > div { grid-column: 1 / span 8; }
  .itinerary__hero aside { grid-column: 9 / -1; }
}
</style>
