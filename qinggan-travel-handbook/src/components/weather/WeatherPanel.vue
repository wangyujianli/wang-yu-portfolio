<script setup lang="ts">
import { ref, watch } from 'vue'
import { CloudSun, Droplets, RefreshCw, ThermometerSun, Wind } from '@lucide/vue'
import { getPlaceWeather, weatherLabel, type WeatherResult } from '@/services/weather'
import type { Coordinates } from '@/types/content'

const props = defineProps<{ placeId: string; coordinates: Coordinates }>()
const result = ref<WeatherResult>()
const loading = ref(false)

function formatDay(date: string, index: number): string {
  if (index === 0) return '今天'
  return new Intl.DateTimeFormat('zh-CN', { weekday: 'short', month: 'numeric', day: 'numeric' }).format(new Date(`${date}T12:00:00`))
}

function formatUpdate(value: string | null): string {
  if (!value) return ''
  return new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))
}

async function load(): Promise<void> {
  loading.value = true
  result.value = await getPlaceWeather(props.placeId, props.coordinates)
  loading.value = false
}

watch(() => props.placeId, load, { immediate: true })
</script>

<template>
  <section class="weather-panel paper-card" aria-live="polite">
    <header>
      <div>
        <p class="eyebrow"><CloudSun :size="17" />沿途天气</p>
        <h2>今天和接下来几天</h2>
      </div>
      <button type="button" :disabled="loading" aria-label="重新加载天气" @click="load">
        <RefreshCw :size="19" :class="{ spinning: loading }" />
      </button>
    </header>

    <div v-if="loading && !result" class="weather-loading">
      <span></span><span></span><span></span>
    </div>

    <div v-else-if="result?.status === 'ready' && result.current" class="weather-content">
      <div class="weather-current">
        <strong>{{ result.current.temperature }}°</strong>
        <div>
          <b>{{ weatherLabel(result.current.weatherCode) }}</b>
          <span><ThermometerSun :size="16" />体感 {{ result.current.apparentTemperature }}°</span>
          <span><Wind :size="16" />风速 {{ result.current.windSpeed }} km/h</span>
          <span><Droplets :size="16" />降水概率 {{ result.current.precipitationProbability }}%</span>
        </div>
      </div>

      <div class="weather-days">
        <article v-for="(day, index) in result.daily" :key="day.date">
          <span>{{ formatDay(day.date, index) }}</span>
          <b>{{ weatherLabel(day.weatherCode) }}</b>
          <strong>{{ day.high }}° <i>{{ day.low }}°</i></strong>
          <small>降水 {{ day.precipitationProbability }}%</small>
        </article>
      </div>
    </div>

    <p v-else class="weather-unavailable">{{ result?.notice }}</p>

    <footer v-if="result">
      <span>{{ result.notice }}</span>
      <time v-if="result.updatedAt">更新于 {{ formatUpdate(result.updatedAt) }}</time>
    </footer>
  </section>
</template>

<style scoped>
.weather-panel {
  padding: 24px;
  overflow: hidden;
}

.weather-panel header,
.weather-panel footer,
.weather-current,
.weather-current div,
.weather-current span {
  display: flex;
}

.weather-panel header {
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.weather-panel .eyebrow {
  display: flex;
  align-items: center;
  gap: 7px;
}

.weather-panel h2 {
  margin-bottom: 20px;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}

.weather-panel header button {
  display: grid;
  min-width: 44px;
  min-height: 44px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--lake);
  background: rgb(255 255 255 / 54%);
  cursor: pointer;
}

.weather-panel header button:disabled { cursor: wait; opacity: 0.65; }
.spinning { animation: spin 1s linear infinite; }

.weather-current {
  align-items: center;
  gap: 20px;
  padding: 18px 0;
  border-block: 1px solid var(--line);
}

.weather-current > strong {
  font: 700 clamp(3.8rem, 10vw, 6rem)/1 var(--serif);
}

.weather-current div {
  flex-wrap: wrap;
  gap: 7px 14px;
}

.weather-current b { width: 100%; font-family: var(--serif); }
.weather-current span { align-items: center; gap: 5px; color: var(--muted); font-size: 0.76rem; }

.weather-days {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 18px;
}

.weather-days article {
  display: grid;
  gap: 4px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 15px;
}

.weather-days span,
.weather-days small { color: var(--muted); font-size: 0.72rem; }
.weather-days strong { font-size: 1.15rem; }
.weather-days strong i { color: var(--muted); font-style: normal; font-weight: 400; }

.weather-panel footer {
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px 16px;
  margin-top: 14px;
  color: var(--muted);
  font-size: 0.7rem;
}

.weather-loading { display: flex; gap: 10px; }
.weather-loading span { width: 28%; height: 80px; border-radius: 15px; background: rgb(53 42 36 / 7%); animation: pulse 1.4s ease-in-out infinite alternate; }
.weather-unavailable { margin: 8px 0; color: var(--muted); }

@media (min-width: 720px) {
  .weather-panel { padding: 28px; }
  .weather-content { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 24px; }
  .weather-current { border-bottom: 0; }
  .weather-days { grid-template-columns: repeat(4, 1fr); margin: 0; align-content: center; }
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { from { opacity: 0.35; } to { opacity: 0.85; } }
</style>
