<script setup lang="ts">
import { BedDouble, Camera, CloudRain, Gauge, Sun, Ticket, Trash2, Wind } from '@lucide/vue'
import type { NineDayReference } from '@/types/content'

defineProps<{ day: NineDayReference }>()
</script>

<template>
  <article class="itinerary-day" data-itinerary-day>
    <div class="itinerary-day__index"><span>D</span><strong>{{ day.day }}</strong></div>
    <div class="itinerary-day__main">
      <header>
        <div>
          <p class="eyebrow">REFERENCE DAY {{ String(day.day).padStart(2, '0') }}</p>
          <h2>{{ day.title }}</h2>
        </div>
        <span class="pressure"><Gauge :size="17" />驾驶压力 · {{ day.drivingPressure }}</span>
      </header>
      <p class="itinerary-day__line">{{ day.mainLine }}</p>
      <div class="itinerary-day__periods">
        <span>{{ day.departureWindow }}</span>
        <i v-for="period in day.bestPeriods" :key="period">{{ period }}</i>
      </div>

      <details>
        <summary>展开当天取舍与替代方案</summary>
        <div class="itinerary-day__details">
          <section><strong>核心地点</strong><p>{{ day.corePlaces.join(' · ') }}</p></section>
          <section><Trash2 :size="18" /><strong>可以删除</strong><p>{{ day.removablePlaces.join(' · ') }}</p></section>
          <section><CloudRain :size="18" /><strong>雨天替代</strong><p>{{ day.weatherAlternatives.rain }}</p></section>
          <section><Wind :size="18" /><strong>大风替代</strong><p>{{ day.weatherAlternatives.wind }}</p></section>
          <section><Sun :size="18" /><strong>高温替代</strong><p>{{ day.weatherAlternatives.heat }}</p></section>
          <section><BedDouble :size="18" /><strong>住宿区域</strong><p>{{ day.stayArea }}</p></section>
          <section><Ticket :size="18" /><strong>预约复核</strong><p>{{ day.reservations.join(' · ') }}</p></section>
          <section><Camera :size="18" /><strong>拍照主题</strong><p>{{ day.photoTheme }}</p></section>
        </div>
      </details>
      <p class="itinerary-day__tip">{{ day.lightTip }}</p>
    </div>
  </article>
</template>

<style scoped>
.itinerary-day { display: grid; grid-template-columns: 54px minmax(0, 1fr); gap: 16px; padding: 28px 0; border-top: 1px solid var(--line); }
.itinerary-day__index { display: flex; height: 70px; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--sunset); border-radius: 999px; color: var(--sunset); background: rgb(255 255 255 / 36%); }
.itinerary-day__index span { font-size: .62rem; letter-spacing: .12em; }
.itinerary-day__index strong { font: 700 1.8rem/1 var(--serif); }
.itinerary-day__main { min-width: 0; }
.itinerary-day header { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 14px; }
.itinerary-day h2 { margin: 5px 0 0; font-size: clamp(1.8rem, 4vw, 3.2rem); }
.pressure { display: inline-flex; min-height: 40px; align-items: center; gap: 7px; padding: 0 13px; border-radius: 999px; color: var(--lake); background: rgb(45 127 123 / 9%); font-size: .78rem; }
.itinerary-day__line { max-width: 850px; margin: 18px 0 13px; color: var(--ink); font-size: 1.02rem; }
.itinerary-day__periods { display: flex; flex-wrap: wrap; gap: 8px; color: var(--muted); font-size: .78rem; }
.itinerary-day__periods span, .itinerary-day__periods i { padding: 7px 10px; border: 1px solid var(--line); border-radius: 999px; font-style: normal; background: rgb(255 255 255 / 30%); }
.itinerary-day details { margin-top: 20px; }
.itinerary-day summary { display: inline-flex; min-height: 44px; align-items: center; color: var(--sunset); font-weight: 700; cursor: pointer; }
.itinerary-day__details { display: grid; gap: 10px; padding-top: 14px; }
.itinerary-day__details section { display: grid; grid-template-columns: 22px minmax(0, 1fr); gap: 3px 8px; padding: 14px; border-left: 2px solid color-mix(in srgb, var(--lake) 28%, transparent); background: rgb(255 255 255 / 25%); }
.itinerary-day__details section:first-child { grid-template-columns: 1fr; }
.itinerary-day__details svg { grid-row: span 2; color: var(--sunset); }
.itinerary-day__details strong { font-size: .82rem; }
.itinerary-day__details p { margin: 0; color: var(--muted); font-size: .8rem; }
.itinerary-day__tip { margin: 18px 0 0; padding-left: 14px; border-left: 2px solid var(--sunset); color: var(--muted); font-family: var(--serif); }

@media (min-width: 760px) {
  .itinerary-day { grid-template-columns: 80px minmax(0, 1fr); gap: 28px; padding-block: 38px; }
  .itinerary-day__index { height: 96px; }
  .itinerary-day__details { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
