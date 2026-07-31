<script setup lang="ts">
import { CloudSun, PlaneTakeoff, Route, TicketCheck } from '@lucide/vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { preparationItems } from '@/data/preparation'

const icons = { 票务: TicketCheck, 活动: PlaneTakeoff, 天气: CloudSun, 道路: Route, 设备: PlaneTakeoff, 开放信息: TicketCheck }
</script>

<template>
  <main class="preparation page-shell">
    <SectionHeading eyebrow="BEFORE GOING WEST" title="出发前建议复核" intro="这里只收真正会影响体验的信息。它不是提醒任务，也不会催促出发；临近旅行时顺手翻一遍即可。" />
    <section class="preparation-grid">
      <article v-for="(item, index) in preparationItems" :key="item.id" class="preparation-card paper-card">
        <div class="preparation-card__top"><component :is="icons[item.category]" :size="24" /><span>{{ String(index + 1).padStart(2, '0') }}</span></div>
        <p class="eyebrow">{{ item.category }}</p>
        <h2>{{ item.title }}</h2>
        <p>{{ item.summary }}</p>
        <ul><li v-for="check in item.checks" :key="check">{{ check }}</li></ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.preparation-grid { display: grid; gap: 18px; }
.preparation-card { padding: 24px; }
.preparation-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; color: var(--lake); }
.preparation-card__top span { color: rgb(53 42 36 / 20%); font: 700 2.6rem/1 var(--serif); }
.preparation-card h2 { margin-bottom: 12px; font-size: 1.7rem; }
.preparation-card > p:not(.eyebrow) { color: var(--muted); }
.preparation-card ul { margin: 20px 0 0; padding: 16px 0 0 1.2rem; border-top: 1px solid var(--line); color: var(--muted); }
.preparation-card li + li { margin-top: 8px; }
@media (min-width: 720px) { .preparation-grid { grid-template-columns: repeat(2, 1fr); gap: 26px; } }
@media (min-width: 1180px) { .preparation-grid { grid-template-columns: repeat(3, 1fr); } .preparation-card:first-child, .preparation-card:last-child { grid-column: span 2; } }
</style>
