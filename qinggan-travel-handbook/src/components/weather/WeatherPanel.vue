<script setup lang="ts">
import { CloudSun } from '@lucide/vue'
import WeatherCheckpointCard from '@/components/weather/WeatherCheckpointCard.vue'
import { weatherNotice, type WeatherCheckpoint } from '@/data/weatherCheckpoints'

defineProps<{ checkpoint: WeatherCheckpoint }>()
</script>

<template>
  <section class="weather-panel paper-card" aria-labelledby="weather-panel-title" data-weather-quick-check>
    <header class="weather-panel__header">
      <div>
        <p class="eyebrow"><CloudSun :size="17" />沿途天气 · 外部速查</p>
        <h2 id="weather-panel-title">天气速查与影响提醒</h2>
      </div>
      <p>{{ weatherNotice }}</p>
    </header>
    <WeatherCheckpointCard :checkpoint="checkpoint" compact />
  </section>
</template>

<style scoped>
.weather-panel { display: grid; gap: 22px; padding: clamp(22px, 4vw, 34px); overflow: hidden; }
.weather-panel__header { display: grid; gap: 12px; }
.weather-panel .eyebrow { display: flex; align-items: center; gap: 7px; }
.weather-panel h2 { margin: 8px 0 0; font-size: clamp(1.8rem, 4vw, 3rem); }
.weather-panel__header > p { max-width: 760px; margin: 0; color: var(--muted); line-height: 1.75; }

@media (min-width: 900px) {
  .weather-panel__header { grid-template-columns: minmax(0, .8fr) minmax(360px, 1.2fr); align-items: end; }
}
</style>
