<script setup lang="ts">
import type { Component } from 'vue'
import {
  ArrowDown, Camera, CarFront, CloudSun, ContactRound, HeartPulse,
  PhoneCall, Shirt, SunMedium, TicketCheck, UtensilsCrossed,
} from '@lucide/vue'
import type { PreparationIconKey, PreparationQuickEntry } from '@/types/content'

defineProps<{ entries: PreparationQuickEntry[] }>()

const icons: Record<PreparationIconKey, Component> = {
  ticket: TicketCheck,
  id: ContactRound,
  clothing: Shirt,
  sun: SunMedium,
  food: UtensilsCrossed,
  health: HeartPulse,
  vehicle: CarFront,
  camera: Camera,
  weather: CloudSun,
  emergency: PhoneCall,
}
</script>

<template>
  <section class="workbench" aria-labelledby="preparation-workbench-title" data-preparation-workbench>
    <header class="workbench__header">
      <div>
        <p class="eyebrow">TRAVEL WORKBENCH · 10 CHECKPOINTS</p>
        <h2 id="preparation-workbench-title">先把十件事放到桌面上</h2>
      </div>
      <p>不用一次读完。临近出发时从最相关的一张开始，点开就能到对应内容。</p>
    </header>

    <div class="workbench__grid">
      <a
        v-for="(entry, index) in entries"
        :key="entry.id"
        :href="`#${entry.id}`"
        class="workbench-card"
        :class="`workbench-card--${entry.icon}`"
        data-preparation-entry
      >
        <div class="workbench-card__visual" aria-hidden="true">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <component :is="icons[entry.icon]" :size="32" :stroke-width="1.45" />
        </div>
        <div class="workbench-card__copy">
          <h3>{{ entry.title }}</h3>
          <dl>
            <div><dt>什么时候确认</dt><dd>{{ entry.confirmWhen }}</dd></div>
            <div><dt>需要带什么</dt><dd>{{ entry.bring }}</dd></div>
          </dl>
          <p>{{ entry.reminder }}</p>
          <span>查看详情 <ArrowDown :size="16" /></span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.workbench {
  margin: 28px 0 52px;
  padding: clamp(22px, 4vw, 42px);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 34px;
  background:
    radial-gradient(circle at 84% 8%, rgb(216 155 53 / 15%), transparent 24%),
    linear-gradient(140deg, rgb(255 255 255 / 54%), rgb(232 220 196 / 38%));
}

.workbench__header { display: grid; gap: 14px; margin-bottom: 28px; }
.workbench__header h2 { margin: 8px 0 0; font-size: clamp(2.2rem, 5vw, 4.5rem); }
.workbench__header > p { max-width: 600px; margin: 0; color: var(--muted); line-height: 1.8; }
.workbench__grid { display: grid; gap: 14px; }

.workbench-card {
  position: relative;
  display: grid;
  min-width: 0;
  grid-template-columns: 82px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgb(117 89 61 / 17%);
  border-radius: 22px;
  color: var(--ink);
  background: rgb(255 253 248 / 62%);
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease;
}

.workbench-card:hover { border-color: rgb(59 130 160 / 42%); transform: translateY(-2px); }
.workbench-card:focus-visible { outline: 3px solid rgb(59 130 160 / 32%); outline-offset: 3px; }

.workbench-card__visual {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 10px;
  color: var(--lake);
  background: rgb(59 130 160 / 9%);
}

.workbench-card--clothing .workbench-card__visual,
.workbench-card--food .workbench-card__visual { color: #8a5d28; background: rgb(216 155 53 / 12%); }
.workbench-card--sun .workbench-card__visual,
.workbench-card--emergency .workbench-card__visual { color: #a14936; background: rgb(169 68 58 / 8%); }
.workbench-card__visual span { font: 700 .72rem/1 var(--serif); letter-spacing: .12em; }
.workbench-card__copy { min-width: 0; padding: 18px; }
.workbench-card h3 { margin: 0 0 13px; font-size: 1.22rem; }
.workbench-card dl { display: grid; gap: 8px; margin: 0; }
.workbench-card dl > div { display: grid; gap: 2px; }
.workbench-card dt { color: var(--sunset); font-size: .68rem; font-weight: 700; letter-spacing: .08em; }
.workbench-card dd { min-width: 0; margin: 0; color: var(--muted); font-size: .8rem; line-height: 1.5; }
.workbench-card p { margin: 12px 0; font-size: .82rem; line-height: 1.6; }
.workbench-card__copy > span { display: inline-flex; min-height: 44px; align-items: center; gap: 5px; color: var(--lake); font-size: .78rem; font-weight: 700; }

@media (min-width: 720px) {
  .workbench__header { grid-template-columns: minmax(0, 1fr) minmax(280px, .7fr); align-items: end; }
  .workbench__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1120px) {
  .workbench__grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .workbench-card { grid-template-columns: 1fr; }
  .workbench-card__visual { min-height: 112px; flex-direction: row; padding: 18px; }
  .workbench-card__copy { padding: 20px; }
  .workbench-card dl { min-height: 104px; }
}

@media (max-width: 420px) {
  .workbench { padding-inline: 14px; border-radius: 26px; }
  .workbench-card { grid-template-columns: 68px minmax(0, 1fr); }
  .workbench-card__copy { padding: 16px 14px; }
}
</style>
