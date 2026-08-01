<script setup lang="ts">
import { ArrowLeftRight, Clock3, Compass, Sparkles, Users } from '@lucide/vue'
import type { Place } from '@/types/content'
import { extensionNoticeFor, placePriorityLabels, routeScopeLabels } from '@/data/placeClassifications'

defineProps<{ place: Place }>()
</script>

<template>
  <section class="place-value" data-place-value>
    <header>
      <p class="eyebrow">THE REASON TO STOP</p>
      <h2>先看懂这一站，再决定停多久</h2>
    </header>

    <div class="place-value__classification">
      <p data-classification-summary>
        本次分类：{{ placePriorityLabels[place.classification.priority] }} · {{ routeScopeLabels[place.classification.routeScope] }}
      </p>
      <p data-classification-reason>{{ place.classification.priorityReason }}</p>
      <small>{{ place.classification.routeReason }}</small>
      <small v-if="place.classification.seasonalNote" class="place-value__seasonal">{{ place.classification.seasonalNote }}</small>
      <small v-if="place.classification.routeDecisionNote" class="place-value__decision-note" data-route-decision-note>{{ place.classification.routeDecisionNote }}</small>
      <aside v-if="extensionNoticeFor(place.classification.routeScope)" data-extension-notice>{{ extensionNoticeFor(place.classification.routeScope) }}</aside>
    </div>

    <div class="place-value__grid">
      <article class="place-value__reason">
        <span class="place-value__number">01</span>
        <p class="place-value__label" data-value-heading>为什么值得去</p>
        <p>{{ place.value.reasonToVisit }}</p>
      </article>

      <article class="place-value__unique">
        <Sparkles :size="22" :stroke-width="1.6" />
        <p class="place-value__label" data-value-heading>这里最特别的是什么</p>
        <p>{{ place.value.uniqueness }}</p>
        <small v-if="place.value.contrastWithNearby"><ArrowLeftRight :size="15" />{{ place.value.contrastWithNearby }}</small>
      </article>

      <article class="place-value__decision">
        <Compass :size="21" :stroke-width="1.6" />
        <p class="place-value__label" data-value-heading>推荐等级</p>
        <strong :data-priority="place.classification.priority">{{ place.value.priorityLabel }}</strong>
      </article>

      <article class="place-value__audience">
        <Users :size="21" :stroke-width="1.6" />
        <p class="place-value__label" data-value-heading>适合谁</p>
        <div><span v-for="tag in place.value.bestFor" :key="tag">{{ tag }}</span></div>
      </article>

      <article class="place-value__time">
        <Clock3 :size="21" :stroke-width="1.6" />
        <p class="place-value__label" data-value-heading>时间紧时怎么选择</p>
        <p>{{ place.value.ifTimeIsLimited }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.place-value {
  margin-top: 30px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 52%), rgb(255 255 255 / 22%)),
    radial-gradient(circle at 92% 8%, rgb(45 127 123 / 13%), transparent 29%);
}

.place-value header {
  max-width: 760px;
  margin-bottom: 24px;
}

.place-value h2 {
  margin-top: 9px;
  font-size: clamp(2rem, 5vw, 3.8rem);
}

.place-value__grid {
  display: grid;
  gap: 12px;
}

.place-value__classification {
  display: grid;
  gap: 9px;
  margin-bottom: 18px;
  padding: 18px 20px;
  border-left: 2px solid var(--sunset);
  border-radius: 0 16px 16px 0;
  background: rgb(255 255 255 / 32%);
}

.place-value__classification p,
.place-value__classification small,
.place-value__classification aside { margin: 0; }
.place-value__classification > p:first-child { color: var(--sunset); font-size: .78rem; font-weight: 800; letter-spacing: .04em; }
.place-value__classification > p:nth-child(2) { font: 600 1rem/1.75 var(--serif); }
.place-value__classification small { color: var(--muted); line-height: 1.65; }
.place-value__classification aside { padding: 13px 15px; border: 1px dashed rgb(45 127 123 / 28%); border-radius: 13px; color: var(--lake); background: rgb(45 127 123 / 7%); line-height: 1.65; }
.place-value__decision-note { color: var(--ink) !important; }
.place-value__seasonal { color: #8a5b2f !important; }

.place-value article {
  position: relative;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgb(247 240 229 / 68%);
}

.place-value article > svg {
  margin-bottom: 15px;
  color: var(--sunset);
}

.place-value__number {
  display: block;
  margin-bottom: 18px;
  color: var(--sunset);
  font: 700 0.78rem/1 var(--serif);
  letter-spacing: 0.15em;
}

.place-value__label {
  margin: 0 0 9px;
  color: var(--muted);
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.place-value article > p:last-child {
  margin: 0;
  line-height: 1.78;
}

.place-value__reason > p:last-child {
  font: 600 clamp(1.1rem, 2vw, 1.42rem)/1.8 var(--serif);
}

.place-value__unique small {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  line-height: 1.65;
}

.place-value__unique small svg { flex: 0 0 auto; margin-top: 3px; color: var(--lake); }

.place-value__decision strong {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  color: #fff;
  background: var(--sunset);
  font-size: 0.88rem;
}

.place-value__audience div {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.place-value__audience span {
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink);
  background: rgb(255 255 255 / 45%);
  font-size: 0.76rem;
}

@media (min-width: 720px) {
  .place-value { padding: 38px; }
  .place-value__grid { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  .place-value__reason { grid-column: span 7; }
  .place-value__unique { grid-column: span 5; }
  .place-value__decision { grid-column: span 3; }
  .place-value__audience { grid-column: span 4; }
  .place-value__time { grid-column: span 5; }
}
</style>
