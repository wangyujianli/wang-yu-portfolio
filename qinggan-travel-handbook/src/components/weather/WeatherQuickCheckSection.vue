<script setup lang="ts">
import { CloudSun } from '@lucide/vue'
import WeatherCheckpointCard from '@/components/weather/WeatherCheckpointCard.vue'
import { weatherCheckpoints, weatherNotice } from '@/data/weatherCheckpoints'
</script>

<template>
  <section id="weather-quick-check" class="weather-quick" aria-labelledby="weather-quick-title" data-weather-quick-section>
    <header>
      <div>
        <p class="eyebrow"><CloudSun :size="18" />WEATHER CHECK · 11 STOPS</p>
        <h2 id="weather-quick-title">沿途天气速查</h2>
      </div>
      <p>{{ weatherNotice }}</p>
    </header>

    <div class="weather-quick__grid">
      <WeatherCheckpointCard
        v-for="checkpoint in weatherCheckpoints"
        :key="checkpoint.id"
        :checkpoint="checkpoint"
      />
    </div>
  </section>
</template>

<style scoped>
.weather-quick { scroll-margin-top: 92px; margin: 0 0 52px; padding: clamp(24px, 4vw, 42px); border: 1px solid var(--line); border-radius: 32px; background: linear-gradient(145deg, rgb(59 130 160 / 7%), rgb(255 255 255 / 32%)); }
.weather-quick > header { display: grid; gap: 14px; margin-bottom: 28px; }
.weather-quick .eyebrow { display: flex; align-items: center; gap: 7px; }
.weather-quick h2 { margin: 8px 0 0; font-size: clamp(2.2rem, 5vw, 4rem); }
.weather-quick header > p { max-width: 760px; margin: 0; color: var(--muted); line-height: 1.75; }
.weather-quick__grid { display: grid; gap: 18px; }

@media (min-width: 760px) {
  .weather-quick > header { grid-template-columns: minmax(0, .75fr) minmax(360px, 1.25fr); align-items: end; }
  .weather-quick__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1240px) {
  .weather-quick__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 420px) {
  .weather-quick { padding-inline: 14px; border-radius: 26px; }
}
</style>
