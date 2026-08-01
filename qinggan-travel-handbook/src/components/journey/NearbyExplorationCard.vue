<script setup lang="ts">
import { CalendarClock, CloudSun, Compass, MapPinned, Route, ShieldCheck, TicketCheck } from '@lucide/vue'
import type { NearbyExploration } from '@/types/content'

defineProps<{ item: NearbyExploration; index: number }>()
</script>

<template>
  <article class="nearby-card" data-nearby-card>
    <header><span>{{ String(index + 1).padStart(2, '0') }}</span><div><h2>{{ item.name }}</h2><p>{{ item.reason }}</p></div></header>
    <div class="nearby-card__facts">
      <p><CalendarClock :size="18" /><span><b>增加时间</b>{{ item.extraTime }}</span></p>
      <p><Compass :size="18" /><span><b>从哪里出发</b>{{ item.bestStartingPoint }}</span></p>
      <p><Route :size="18" /><span><b>绕路判断</b>{{ item.detourNote }}</span></p>
      <p><CloudSun :size="18" /><span><b>季节与天气</b>{{ item.season }}；{{ item.weatherSensitivity }}</span></p>
      <p><MapPinned :size="18" /><span><b>临时决定</b>{{ item.spontaneous }}</span></p>
      <p><TicketCheck :size="18" /><span><b>预约复核</b>{{ item.reservationNote }}</span></p>
    </div>
    <p class="nearby-card__boundary"><ShieldCheck :size="18" />{{ item.boundaryNote }}</p>
  </article>
</template>

<style scoped>
.nearby-card { padding: 26px 0; border-top: 1px solid var(--line); }
.nearby-card header { display: grid; grid-template-columns: 42px minmax(0, 1fr); gap: 14px; }
.nearby-card header > span { color: var(--sunset); font: 700 .78rem/1.7 var(--serif); }
.nearby-card h2 { margin-bottom: 8px; font-size: clamp(1.65rem, 3vw, 2.4rem); }
.nearby-card header p { max-width: 700px; margin: 0; color: var(--muted); }
.nearby-card__facts { display: grid; gap: 9px; margin: 22px 0 0 56px; }
.nearby-card__facts p { display: flex; align-items: flex-start; gap: 9px; margin: 0; padding: 12px; background: rgb(255 255 255 / 25%); }
.nearby-card__facts svg { flex: 0 0 auto; margin-top: 3px; color: var(--sunset); }
.nearby-card__facts b { display: block; margin-bottom: 2px; color: var(--ink); font-size: .78rem; }
.nearby-card__facts span { color: var(--muted); font-size: .8rem; }
.nearby-card__boundary { display: flex; align-items: flex-start; gap: 8px; margin: 10px 0 0 56px; padding: 13px; color: var(--lake); background: rgb(45 127 123 / 8%); font-size: .8rem; }
.nearby-card__boundary svg { flex: 0 0 auto; }

@media (min-width: 760px) {
  .nearby-card__facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 520px) {
  .nearby-card__facts, .nearby-card__boundary { margin-left: 0; }
}
</style>
