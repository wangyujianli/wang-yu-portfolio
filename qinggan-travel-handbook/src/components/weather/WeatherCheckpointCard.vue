<script setup lang="ts">
import { ExternalLink, Shirt, SunMedium, Wind } from '@lucide/vue'
import type { WeatherCheckpoint } from '@/data/weatherCheckpoints'

defineProps<{
  checkpoint: WeatherCheckpoint
  compact?: boolean
}>()
</script>

<template>
  <article class="weather-card" :class="{ 'weather-card--compact': compact }" data-weather-checkpoint>
    <header>
      <div>
        <p>WEATHER CHECK · {{ checkpoint.queryArea }}</p>
        <h3>{{ checkpoint.name }}</h3>
      </div>
      <span aria-hidden="true">{{ checkpoint.name.slice(0, 1) }}</span>
    </header>

    <div class="weather-card__guidance">
      <p><Wind :size="18" /><span><b>对游览的影响</b>{{ checkpoint.impact }}</span></p>
      <p><Shirt :size="18" /><span><b>穿衣提醒</b>{{ checkpoint.clothing }}</span></p>
      <p><SunMedium :size="18" /><span><b>防晒与防风</b>{{ checkpoint.protection }}</span></p>
    </div>

    <p v-if="checkpoint.queryNote" class="weather-card__query-note">{{ checkpoint.queryNote }}</p>

    <footer>
      <span>建议出发前一天再次确认</span>
      <a
        :href="checkpoint.weatherUrl"
        target="_blank"
        rel="noopener noreferrer"
        data-weather-link
      >
        查看最新天气<ExternalLink :size="16" />
      </a>
    </footer>
  </article>
</template>

<style scoped>
.weather-card {
  display: grid;
  min-width: 0;
  gap: 18px;
  padding: clamp(20px, 3vw, 28px);
  border: 1px solid rgb(117 89 61 / 18%);
  border-radius: 24px;
  background:
    radial-gradient(circle at 92% 8%, rgb(59 130 160 / 12%), transparent 28%),
    rgb(255 253 248 / 66%);
}

.weather-card header,
.weather-card footer,
.weather-card__guidance p,
.weather-card a {
  display: flex;
}

.weather-card header { align-items: start; justify-content: space-between; gap: 14px; }
.weather-card header p { margin: 0 0 7px; color: var(--lake); font-size: .68rem; font-weight: 700; letter-spacing: .1em; }
.weather-card h3 { margin: 0; font-size: clamp(1.65rem, 3vw, 2.25rem); }
.weather-card header > span { display: grid; width: 44px; height: 44px; flex: 0 0 auto; place-items: center; border: 1px solid rgb(59 130 160 / 24%); border-radius: 50%; color: var(--lake); font: 700 1.15rem/1 var(--serif); }
.weather-card__guidance { display: grid; gap: 13px; }
.weather-card__guidance p { align-items: flex-start; gap: 11px; margin: 0; color: var(--muted); line-height: 1.65; }
.weather-card__guidance svg { flex: 0 0 auto; margin-top: 3px; color: var(--sunset); }
.weather-card__guidance span { min-width: 0; }
.weather-card__guidance b { display: block; margin-bottom: 2px; color: var(--ink); font-size: .76rem; letter-spacing: .04em; }
.weather-card__query-note { margin: 0; padding: 11px 13px; border-left: 2px solid rgb(59 130 160 / 45%); color: var(--muted); background: rgb(59 130 160 / 6%); font-size: .76rem; line-height: 1.6; }
.weather-card footer { flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding-top: 14px; border-top: 1px solid var(--line); }
.weather-card footer > span { color: var(--muted); font-size: .74rem; }
.weather-card a { min-height: 44px; align-items: center; justify-content: center; gap: 7px; padding: 10px 15px; border-radius: 999px; color: #fff; background: var(--lake); font-size: .78rem; font-weight: 700; text-decoration: none; }
.weather-card a:hover { background: #285f76; }
.weather-card a:focus-visible { outline: 3px solid rgb(59 130 160 / 30%); outline-offset: 3px; }

.weather-card--compact .weather-card__guidance { grid-template-columns: repeat(3, minmax(0, 1fr)); }

@media (max-width: 720px) {
  .weather-card--compact .weather-card__guidance { grid-template-columns: 1fr; }
}
</style>
