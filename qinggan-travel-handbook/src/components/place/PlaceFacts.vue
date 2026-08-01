<script setup lang="ts">
import { CalendarDays, CloudSun, Clock3, Footprints, Sparkles, Star, Sunrise, Wind } from '@lucide/vue'
import type { Place } from '@/types/content'

defineProps<{ place: Place }>()
</script>

<template>
  <aside class="place-facts paper-card">
    <p class="eyebrow">一眼判断</p>
    <div class="recommendation" :aria-label="`推荐指数 ${place.recommendation} 星`">
      <Star v-for="index in 5" :key="index" :size="19" :fill="index <= place.recommendation ? 'currentColor' : 'none'" />
    </div>
    <dl>
      <div><dt><Sparkles :size="18" />是否值得专程</dt><dd>{{ place.worthDetour }}</dd></div>
      <div><dt><Clock3 :size="18" />建议停留</dt><dd>{{ place.suggestedDuration }}</dd></div>
      <div><dt><CalendarDays :size="18" />适合月份</dt><dd>{{ place.bestSeason }}</dd></div>
      <div><dt><Sunrise :size="18" />观赏时段</dt><dd>{{ place.bestViewingTime }}</dd></div>
      <div><dt><CloudSun :size="18" />适合天气</dt><dd>{{ place.suitableWeather }}</dd></div>
      <div><dt><Wind :size="18" />天气敏感度</dt><dd>{{ place.weatherSensitivity }}</dd></div>
      <div><dt><Footprints :size="18" />步行感受</dt><dd>{{ place.walkingIntensity }}</dd></div>
    </dl>
  </aside>
</template>

<style scoped>
.place-facts {
  padding: 24px;
}

.recommendation {
  display: flex;
  gap: 5px;
  margin: 8px 0 24px;
  color: var(--sunset);
}

dl,
dl div {
  display: grid;
  gap: 6px;
}

dl {
  margin: 0;
  gap: 18px;
}

dl div {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

dl div:last-child {
  padding-bottom: 0;
  border: 0;
}

dt {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  font-size: 0.78rem;
}

dd {
  margin: 0;
  font-weight: 600;
}
</style>
