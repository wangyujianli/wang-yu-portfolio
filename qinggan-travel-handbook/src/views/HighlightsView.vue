<script setup lang="ts">
import { MapPin, Route, Sparkles } from '@lucide/vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { highlights } from '@/data/highlights'
</script>

<template>
  <main class="highlights page-shell">
    <SectionHeading eyebrow="ROADSIDE STORIES" title="沿途彩蛋" intro="有些画面已经出圈，有些只是季节与运气共同留下的偶遇。把它们收在手册里，顺路时多看一眼就好。" />
    <div class="confidence-legend"><span><b>A</b>信息相对稳定</span><span><b>B</b>依赖季节或运营</span><span><b>C</b>变化较多，克制看待</span></div>

    <section class="highlight-grid">
      <article v-for="(item, index) in highlights" :key="item.id" class="highlight-card" :class="`highlight-card--${item.confidence.toLowerCase()}`">
        <div class="highlight-card__number">{{ String(index + 1).padStart(2, '0') }}</div>
        <div class="highlight-card__head"><span>{{ item.confidence }}</span><p><MapPin :size="15" />{{ item.location }}</p></div>
        <h2>{{ item.title }}</h2>
        <p class="highlight-card__reason">{{ item.reason }}</p>
        <dl>
          <div><dt><Route :size="16" />是否顺路</dt><dd>{{ item.routeFit }}</dd></div>
          <div><dt><Sparkles :size="16" />是否值得专程</dt><dd>{{ item.worthTrip }}</dd></div>
        </dl>
        <footer>{{ item.note }}</footer>
      </article>
    </section>
  </main>
</template>

<style scoped>
.confidence-legend { display: flex; flex-wrap: wrap; gap: 10px 18px; margin: 0 0 28px; color: var(--muted); font-size: 0.76rem; }
.confidence-legend span { display: flex; align-items: center; gap: 7px; }
.confidence-legend b { display: grid; width: 28px; height: 28px; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--sunset); background: rgb(255 255 255 / 44%); }
.highlight-grid { display: grid; gap: 18px; }
.highlight-card { position: relative; min-height: 390px; padding: 26px; overflow: hidden; border: 1px solid var(--line); border-radius: 26px; background: rgb(255 255 255 / 40%); }
.highlight-card::after { position: absolute; right: -18%; bottom: -32%; width: 65%; aspect-ratio: 1; border-radius: 50%; background: rgb(217 109 59 / 7%); content: ''; }
.highlight-card--a { background: rgb(45 127 123 / 8%); }
.highlight-card--c { background: rgb(53 42 36 / 5%); }
.highlight-card__number { color: rgb(53 42 36 / 14%); font: 700 4rem/1 var(--serif); }
.highlight-card__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.highlight-card__head > span { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 50%; color: #fff; background: var(--sunset); font-weight: 700; }
.highlight-card__head p { display: flex; align-items: center; gap: 5px; margin: 0; color: var(--muted); font-size: 0.74rem; }
.highlight-card h2 { margin: 18px 0 12px; font-size: 2rem; }
.highlight-card__reason { min-height: 72px; color: var(--muted); }
.highlight-card dl { display: grid; gap: 12px; margin: 22px 0; }
.highlight-card dl div { padding-top: 12px; border-top: 1px solid var(--line); }
.highlight-card dt { display: flex; align-items: center; gap: 6px; color: var(--sunset); font-size: 0.72rem; }
.highlight-card dd { margin: 5px 0 0; font-size: 0.84rem; }
.highlight-card footer { position: relative; z-index: 1; padding: 14px; border-radius: 14px; color: var(--muted); background: rgb(255 255 255 / 44%); font-size: 0.78rem; }
@media (min-width: 720px) { .highlight-grid { grid-template-columns: repeat(2, 1fr); gap: 26px; } .highlight-card:first-child { grid-column: 1 / -1; min-height: 320px; } }
@media (min-width: 1180px) { .highlight-grid { grid-template-columns: repeat(3, 1fr); } .highlight-card:first-child { grid-column: span 2; } }
</style>
