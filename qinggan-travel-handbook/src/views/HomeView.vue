<script setup lang="ts">
import { ArrowRight, Camera, Compass, Footprints, ListChecks, Map, Sparkles } from '@lucide/vue'
import PlaceCard from '@/components/place/PlaceCard.vue'
import { places } from '@/data/places'
import { routeStops } from '@/data/route'
import { useVisitedStore } from '@/stores/visited'

const visited = useVisitedStore()
const featuredPlace = places.find((place) => place.id === 'wusute-yadan') ?? places[0]!
const routeNames = routeStops.filter((stop) => stop.kind === 'route').map((stop) => stop.name)

const entries = [
  { to: '/places', title: '地点指南', note: '16 个地点，按兴趣自由翻阅', icon: Compass, className: 'guide' },
  { to: '/photo-guide', title: '拍照宝典', note: '八类场景与六人构图', icon: Camera, className: 'photo' },
  { to: '/highlights', title: '沿途彩蛋', note: '七个话题，顺路再看', icon: Sparkles, className: 'highlights' },
  { to: '/footprints', title: '我的足迹', note: `${visited.count} 处已去过`, icon: Footprints, className: 'footprints' },
  { to: '/preparation', title: '出发准备', note: '票务、道路与开放信息', icon: ListChecks, className: 'prepare' },
]
</script>

<template>
  <main class="home page-shell">
    <section class="home-hero magazine-grid">
      <div class="home-hero__copy">
        <p class="eyebrow">THE WESTWARD FIELD NOTES · 2026</p>
        <h1>向西<br />而行</h1>
        <p class="home-hero__subtitle">一册跟着六个人从杭州飞向西宁，再沿青甘山河慢慢展开的自由探索手册。</p>
        <div class="home-hero__actions">
          <RouterLink to="/map" class="button-primary"><Map :size="20" />打开探索地图</RouterLink>
          <RouterLink to="/places" class="button-secondary">先看地点 <ArrowRight :size="19" /></RouterLink>
        </div>
      </div>

      <div class="home-cover" aria-hidden="true">
        <div class="home-cover__sun"></div>
        <div class="home-cover__mountain home-cover__mountain--far"></div>
        <div class="home-cover__mountain home-cover__mountain--near"></div>
        <div class="home-cover__road"></div>
        <span class="home-cover__issue">FIELD NOTE<br />NO. 06</span>
        <span class="home-cover__caption">杭州 → 西宁 → 青甘环线</span>
      </div>

      <aside class="journey-counter paper-card">
        <span>此刻足迹</span>
        <strong>{{ visited.count }}</strong>
        <p>共 16 处地点，可随时标记已去过。</p>
      </aside>
    </section>

    <section class="route-folio" aria-label="建议探索顺序">
      <div class="route-folio__heading"><span>ROUTE 01</span><strong>一条环线，不是一张日程表</strong></div>
      <div class="route-folio__track">
        <span v-for="(name, index) in routeNames" :key="`${name}-${index}`"><i></i>{{ name }}</span>
      </div>
    </section>

    <section class="home-entries magazine-grid">
      <RouterLink v-for="entry in entries" :key="entry.to" :to="entry.to" class="entry-card" :class="`entry-card--${entry.className}`">
        <component :is="entry.icon" :size="25" :stroke-width="1.6" />
        <div><h2>{{ entry.title }}</h2><p>{{ entry.note }}</p></div>
        <ArrowRight class="entry-card__arrow" :size="20" />
      </RouterLink>
    </section>

    <section class="home-feature">
      <header>
        <p class="eyebrow">本册精选</p>
        <h2>水与风，把荒原改写成另一种形状</h2>
      </header>
      <PlaceCard :place="featuredPlace" featured />
    </section>
  </main>
</template>

<style scoped>
.home {
  padding-top: 34px;
}

.home-hero {
  position: relative;
  align-items: stretch;
}

.home-hero__copy {
  position: relative;
  z-index: 2;
  padding: 28px 4px 8px;
}

.home-hero h1 {
  margin: 12px 0 18px;
  font-size: clamp(4.8rem, 24vw, 9rem);
  line-height: 0.84;
  letter-spacing: 0.08em;
}

.home-hero__subtitle {
  max-width: 520px;
  color: var(--muted);
  font-size: 1rem;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.home-cover {
  position: relative;
  min-height: 420px;
  overflow: hidden;
  border-radius: 32px;
  background: linear-gradient(180deg, #91b5c1 0 49%, #d8be81 50% 61%, #a46f4f 62%);
  box-shadow: var(--shadow);
}

.home-cover::before {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, rgb(255 255 255 / 6%) 0 1px, transparent 1px 8px);
  content: '';
}

.home-cover__sun {
  position: absolute;
  top: 11%;
  right: 14%;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #e9bd72;
  box-shadow: 0 0 0 22px rgb(255 231 183 / 18%);
}

.home-cover__mountain {
  position: absolute;
  right: -12%;
  bottom: 25%;
  width: 92%;
  height: 42%;
  clip-path: polygon(0 100%, 18% 54%, 32% 72%, 52% 12%, 70% 64%, 82% 38%, 100% 100%);
  background: #8c7b61;
}

.home-cover__mountain--near {
  right: auto;
  bottom: 6%;
  left: -10%;
  width: 118%;
  height: 38%;
  background: #704d3f;
  opacity: 0.86;
  clip-path: polygon(0 100%, 0 58%, 21% 24%, 38% 68%, 61% 13%, 76% 58%, 100% 34%, 100% 100%);
}

.home-cover__road {
  position: absolute;
  bottom: -12%;
  left: 42%;
  width: 26%;
  height: 54%;
  background: #554b47;
  clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%);
}

.home-cover__road::after {
  position: absolute;
  top: 6%;
  bottom: 0;
  left: 49%;
  width: 2px;
  background: repeating-linear-gradient(#f2ddad 0 9px, transparent 9px 18px);
  content: '';
}

.home-cover__issue,
.home-cover__caption {
  position: absolute;
  color: #fff;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
}

.home-cover__issue { top: 22px; left: 22px; }
.home-cover__caption { right: 20px; bottom: 20px; }

.journey-counter {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 3px 16px;
  padding: 20px;
}

.journey-counter span {
  color: var(--sunset);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.journey-counter strong {
  grid-row: span 2;
  grid-column: 2;
  justify-self: end;
  color: var(--lake);
  font: 700 4.2rem/1 var(--serif);
}

.journey-counter p { margin: 0; color: var(--muted); font-size: 0.82rem; }

.route-folio {
  margin: 42px 0;
  padding: 24px 0;
  border-block: 1px solid var(--line);
}

.route-folio__heading {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  font-size: 0.78rem;
}

.route-folio__heading span { color: var(--sunset); letter-spacing: 0.12em; }

.route-folio__track {
  display: flex;
  overflow-x: auto;
  padding: 4px 2px 12px;
  scrollbar-width: thin;
}

.route-folio__track span {
  position: relative;
  display: flex;
  min-width: 94px;
  flex: 1 0 auto;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.76rem;
}

.route-folio__track span::before {
  position: absolute;
  top: 5px;
  right: 0;
  left: 8px;
  height: 1px;
  background: var(--line);
  content: '';
}

.route-folio__track i {
  z-index: 1;
  width: 11px;
  height: 11px;
  border: 2px solid var(--paper);
  border-radius: 50%;
  background: var(--sunset);
  box-shadow: 0 0 0 1px var(--sunset);
}

.home-entries {
  margin-bottom: 56px;
}

.entry-card {
  position: relative;
  display: grid;
  min-height: 138px;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 16px;
  padding: 24px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 24px;
  color: var(--ink);
  background: rgb(255 255 255 / 38%);
  text-decoration: none;
}

.entry-card h2 { margin: 0 0 7px; font-size: 1.35rem; }
.entry-card p { margin: 0; color: var(--muted); font-size: 0.83rem; }
.entry-card__arrow { align-self: end; color: var(--sunset); }
.entry-card--photo { background: rgb(45 127 123 / 10%); }
.entry-card--highlights { background: rgb(217 109 59 / 9%); }

.home-feature > header {
  max-width: 740px;
  margin-bottom: 24px;
}

.home-feature h2 {
  font-size: clamp(2rem, 5vw, 4.2rem);
}

@media (min-width: 720px) {
  .home-hero__copy { grid-column: 1 / 6; grid-row: 1; align-self: center; }
  .home-cover { grid-column: 6 / -1; grid-row: 1; min-height: 540px; }
  .journey-counter { grid-column: 8 / -1; grid-row: 1; align-self: end; margin: 0 22px 22px 0; z-index: 3; }
  .entry-card { grid-column: span 4; }
  .entry-card--guide { grid-column: span 7; }
  .entry-card--photo { grid-column: span 5; }
  .entry-card--highlights { grid-column: span 5; }
  .entry-card--footprints { grid-column: span 3; }
  .entry-card--prepare { grid-column: span 4; }
}

@media (min-width: 1100px) {
  .home-hero__copy { grid-column: 1 / span 5; }
  .home-cover { grid-column: 6 / span 6; }
  .journey-counter { grid-column: 10 / -1; align-self: end; margin: 0 0 44px -50px; }
}
</style>
