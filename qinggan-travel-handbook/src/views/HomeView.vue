<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowRight, BookOpenText, CalendarRange, Camera, Compass, Footprints,
  ListChecks, Map, Milestone, MountainSnow, Sparkles, Waves,
} from '@lucide/vue'
import HomeJourneyMap from '@/components/home/HomeJourneyMap.vue'
import HomeRouteTicket from '@/components/home/HomeRouteTicket.vue'
import PlaceCard from '@/components/place/PlaceCard.vue'
import { homeJourneyRouteById, homeJourneyRoutes } from '@/data/homeJourneyRoutes'
import { placeById, places, standalonePlaces } from '@/data/places'
import { useJourneyStore } from '@/stores/journey'
import { useVisitedStore } from '@/stores/visited'
import type { HomeJourneyRoute, JourneyRouteId } from '@/types/content'

const visited = useVisitedStore()
const journey = useJourneyStore()
const visibleVisitedCount = computed(() => standalonePlaces.filter((place) => visited.isVisited(place.id)).length)
const featuredPlace = places.find((place) => place.id === 'wusute-yadan') ?? places[0]!
const initialRouteId = homeJourneyRouteById.has(journey.selectedRouteId)
  ? journey.selectedRouteId
  : 'classic'
const selectedHomeRouteId = ref<JourneyRouteId>(initialRouteId)
const selectedHomeRoute = computed(() => homeJourneyRouteById.get(selectedHomeRouteId.value) ?? homeJourneyRoutes[0]!)
const selectedRouteNames = computed(() => selectedHomeRoute.value.placeIds
  .filter((id, index, ids) => ids.indexOf(id) === index)
  .map((id) => placeById.get(id)?.name)
  .filter((name): name is string => Boolean(name)))

const entries = computed(() => [
  { to: '/places', title: '地点指南', note: `${standalonePlaces.length} 个地点，另有 1 个生态观察子模块`, icon: Compass, className: 'guide' },
  { to: '/itinerary', title: '九天参考', note: '只是一种走法，随时可以调整', icon: CalendarRange, className: 'itinerary' },
  { to: '/nearby', title: '周边可玩', note: '按多出来的时间判断取舍', icon: Milestone, className: 'nearby' },
  { to: '/photo-guide', title: '拍照宝典', note: '八类场景与六人构图', icon: Camera, className: 'photo' },
  { to: '/highlights', title: '沿途彩蛋', note: '七个话题，顺路再看', icon: Sparkles, className: 'highlights' },
  { to: '/footprints', title: '我的足迹', note: `${visibleVisitedCount.value} 处已去过`, icon: Footprints, className: 'footprints' },
])

const routeChapters = [
  { number: '01', title: '文明向西', places: '西宁、塔尔寺、张掖、嘉峪关、敦煌', icon: BookOpenText },
  { number: '02', title: '进入荒野', places: '阿克塞、G315、水上雅丹、大柴旦', icon: MountainSnow },
  { number: '03', title: '回到湖泊', places: '茶卡盐湖、青海湖', icon: Waves },
]

function selectHomeRoute(route: HomeJourneyRoute): void {
  selectedHomeRouteId.value = route.id
  journey.selectRoute(route.id)
}

function syncRouteBeforeMap(): void {
  journey.selectRoute(selectedHomeRoute.value.id)
}
</script>

<template>
  <main class="home page-shell">
    <section class="home-map-hero" data-home-map-stage>
      <header class="home-map-hero__header">
        <div class="home-map-hero__title">
          <p class="eyebrow">THE WESTWARD FIELD NOTES · 2026</p>
          <h1>向西而行</h1>
          <p>六个人从杭州飞抵西宁，落地换乘商务车。地图先展开，走哪一条，再慢慢商量。</p>
        </div>
        <div class="home-hero-tools" data-home-hero-tools>
          <aside class="home-progress" aria-label="青甘探索进度" data-home-progress>
            <span>此刻足迹</span>
            <strong>{{ visibleVisitedCount }}<small>/{{ standalonePlaces.length }}</small></strong>
            <RouterLink to="/footprints">查看我的足迹 <ArrowRight :size="16" /></RouterLink>
          </aside>
          <RouterLink to="/preparation" class="home-preparation" data-home-preparation>
            <span>出发准备</span>
            <strong>10<small>项</small></strong>
            <em>查看确认清单 <ArrowRight :size="16" /></em>
          </RouterLink>
        </div>
      </header>

      <div class="home-map-hero__stage">
        <HomeJourneyMap :route="selectedHomeRoute" :visited-ids="visited.visitedIds" />
        <aside class="home-route-panel" aria-label="选择路线">
          <div class="home-route-panel__heading">
            <span>ROUTE SELECT</span>
            <h2>两种走法，同一片西北</h2>
            <p>都从现有地点里选择。经典线看完整，优选线看反差。</p>
          </div>
          <div class="home-route-panel__tickets">
            <HomeRouteTicket
              v-for="route in homeJourneyRoutes"
              :key="route.id"
              :route="route"
              :selected="selectedHomeRoute.id === route.id"
              @select="selectHomeRoute(route)"
            />
          </div>
          <div class="home-route-panel__actions">
            <RouterLink to="/preparation" class="button-primary" data-start-exploring>
              <ListChecks :size="19" />开始探索
            </RouterLink>
            <RouterLink to="/map" class="button-secondary" @click="syncRouteBeforeMap">
              <Map :size="19" />直接看地图
            </RouterLink>
          </div>
        </aside>
      </div>
    </section>

    <section class="route-value" data-route-value>
      <header class="route-value__intro">
        <p class="eyebrow">WHY THIS ROUTE</p>
        <h2>为什么是青甘大环线</h2>
        <p>这条路线不是简单串联景点，而是从河湟谷地进入河西走廊，再经过敦煌绿洲、柴达木荒原、盐湖与青海湖。一条路上，可以连续看到宗教、边塞、丝路、沙漠、戈壁、雅丹、盐湖、雪山和草原。</p>
      </header>
      <div class="route-value__chapters">
        <article v-for="chapter in routeChapters" :key="chapter.number" data-route-chapter>
          <div class="route-value__chapter-head">
            <span>{{ chapter.number }}</span>
            <component :is="chapter.icon" :size="22" :stroke-width="1.6" />
          </div>
          <h3>{{ chapter.title }}</h3>
          <p>{{ chapter.places }}</p>
        </article>
      </div>
    </section>

    <section class="route-folio" :aria-label="`${selectedHomeRoute.name}探索顺序`">
      <div class="route-folio__heading">
        <span>{{ selectedHomeRoute.shortName }}</span>
        <strong>路线是一种参考，不是一张必须照做的日程表</strong>
      </div>
      <div class="route-folio__track">
        <span v-for="(name, index) in selectedRouteNames" :key="`${name}-${index}`"><i></i>{{ name }}</span>
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
.home { padding-top: 28px; }

.home-map-hero {
  position: relative;
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: 34px;
  background: rgb(248 241 228 / 52%);
}

.home-map-hero__header {
  display: grid;
  gap: 22px;
  align-items: end;
  margin-bottom: 26px;
}

.home-map-hero__title h1 {
  margin: 8px 0 12px;
  font-size: clamp(3.5rem, 9vw, 6.4rem);
  line-height: .88;
  letter-spacing: .08em;
}

.home-map-hero__title > p:last-child {
  max-width: 690px;
  margin: 0;
  color: var(--muted);
  font-size: clamp(.95rem, 1.7vw, 1.12rem);
  line-height: 1.8;
}

.home-hero-tools {
  display: grid;
  width: min(100%, 444px);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.home-progress,
.home-preparation {
  display: grid;
  min-width: 0;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 4px 14px;
  padding: 17px 18px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgb(255 255 255 / 48%);
}

.home-preparation {
  gap: 4px 8px;
  color: var(--ink);
  background: linear-gradient(145deg, rgb(255 255 255 / 52%), rgb(45 127 123 / 8%));
  text-decoration: none;
  transition: border-color 180ms ease, transform 180ms ease;
}

.home-preparation:hover { border-color: rgb(45 127 123 / 34%); transform: translateY(-2px); }
.home-preparation:focus-visible { outline: 3px solid rgb(45 127 123 / 24%); outline-offset: 3px; }
.home-progress > span,
.home-preparation > span { color: var(--sunset); font-size: .7rem; font-weight: 700; letter-spacing: .12em; }
.home-progress strong,
.home-preparation strong { grid-row: span 2; grid-column: 2; color: var(--lake); font: 700 3.2rem/1 var(--serif); white-space: nowrap; }
.home-progress strong small,
.home-preparation strong small { color: var(--muted); font-size: .95rem; }
.home-progress a,
.home-preparation em { display: inline-flex; align-items: center; gap: 5px; color: var(--muted); font-size: .72rem; font-style: normal; text-decoration: none; }
.home-preparation em { white-space: nowrap; }

.home-map-hero__stage { display: grid; min-width: 0; gap: 18px; }
.home-route-panel { display: grid; min-width: 0; align-content: start; gap: 15px; }
.home-route-panel__heading span { color: var(--sunset); font-size: .7rem; font-weight: 700; letter-spacing: .13em; }
.home-route-panel__heading h2 { margin: 6px 0; font-size: clamp(1.75rem, 3vw, 2.3rem); }
.home-route-panel__heading p { margin: 0; color: var(--muted); font-size: .8rem; line-height: 1.7; }
.home-route-panel__tickets { display: grid; gap: 10px; }
.home-route-panel__actions { display: flex; flex-wrap: wrap; gap: 9px; padding-top: 2px; }

.route-value {
  display: grid;
  gap: 24px;
  margin: 48px 0 28px;
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: 30px;
  background: rgb(255 255 255 / 34%);
}

.route-value__intro h2 { margin: 9px 0 16px; font-size: clamp(2.2rem, 6vw, 4.6rem); }
.route-value__intro > p:last-child { max-width: 850px; margin: 0; color: var(--muted); font-size: clamp(.98rem, 1.7vw, 1.14rem); line-height: 1.9; }
.route-value__chapters { display: grid; gap: 12px; }
.route-value__chapters article { min-height: 176px; padding: 22px; border: 1px solid var(--line); border-radius: 22px; background: rgb(247 240 229 / 68%); }
.route-value__chapter-head { display: flex; align-items: center; justify-content: space-between; color: var(--sunset); }
.route-value__chapter-head span { font: 700 .78rem/1 var(--serif); letter-spacing: .14em; }
.route-value__chapters h3 { margin: 24px 0 9px; font-size: 1.55rem; }
.route-value__chapters p { margin: 0; color: var(--muted); font-size: .86rem; line-height: 1.7; }

.route-folio { margin: 42px 0; padding: 24px 0; border-block: 1px solid var(--line); }
.route-folio__heading { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 22px; font-size: .78rem; }
.route-folio__heading span { color: var(--sunset); letter-spacing: .12em; }
.route-folio__track { display: flex; overflow-x: auto; padding: 4px 2px 12px; scrollbar-width: thin; }
.route-folio__track span { position: relative; display: flex; min-width: 112px; flex: 1 0 auto; flex-direction: column; gap: 8px; color: var(--muted); font-size: .76rem; }
.route-folio__track span::before { position: absolute; top: 5px; right: 0; left: 8px; height: 1px; background: var(--line); content: ''; }
.route-folio__track i { z-index: 1; width: 11px; height: 11px; border: 2px solid var(--paper); border-radius: 50%; background: var(--sunset); box-shadow: 0 0 0 1px var(--sunset); }

.home-entries { margin-bottom: 56px; }
.entry-card { position: relative; display: grid; min-height: 138px; grid-template-columns: auto 1fr auto; align-items: start; gap: 16px; padding: 24px; overflow: hidden; border: 1px solid var(--line); border-radius: 24px; color: var(--ink); background: rgb(255 255 255 / 38%); text-decoration: none; }
.entry-card h2 { margin: 0 0 7px; font-size: 1.35rem; }
.entry-card p { margin: 0; color: var(--muted); font-size: .83rem; }
.entry-card__arrow { align-self: end; color: var(--sunset); }
.entry-card--photo { background: rgb(45 127 123 / 10%); }
.entry-card--highlights { background: rgb(217 109 59 / 9%); }
.home-feature > header { max-width: 740px; margin-bottom: 24px; }
.home-feature h2 { font-size: clamp(2rem, 5vw, 4.2rem); }

@media (min-width: 720px) {
  .home-route-panel__tickets { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .route-value { padding: 38px; }
  .route-value__chapters { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .entry-card { grid-column: span 4; }
  .entry-card--guide { grid-column: span 7; }
  .entry-card--photo { grid-column: span 5; }
  .entry-card--itinerary { grid-column: span 5; background: rgb(47 95 143 / 8%); }
  .entry-card--nearby { grid-column: span 4; background: rgb(102 116 81 / 9%); }
  .entry-card--highlights { grid-column: span 5; }
  .entry-card--footprints { grid-column: span 3; }
}

@media (min-width: 900px) {
  .home-map-hero__header { grid-template-columns: minmax(0, 1fr) auto; }
  .home-map-hero__stage { grid-template-columns: minmax(0, 1.35fr) minmax(360px, .65fr); align-items: start; }
  .home-route-panel__tickets { grid-template-columns: 1fr; }
  .home-map-hero__stage :deep(.home-route-map) { min-height: 610px; }
}

@media (min-width: 1100px) {
  .route-value { grid-template-columns: minmax(0, 1.1fr) minmax(560px, 1.4fr); align-items: end; }
}

@media (max-width: 719px) {
  .home { padding-top: 16px; }
  .home-map-hero { padding: 18px 14px 20px; border-radius: 26px; }
  .home-hero-tools { width: 100%; gap: 8px; }
  .home-progress,
  .home-preparation { gap: 3px 8px; padding: 14px 12px; }
  .home-progress strong,
  .home-preparation strong { font-size: 2.35rem; }
  .home-progress a,
  .home-preparation em { font-size: .66rem; }
  .home-route-panel__tickets { display: flex; overflow-x: auto; margin-inline: -14px; padding: 2px 14px 10px; scroll-snap-type: x mandatory; }
  .home-route-panel__tickets :deep(.route-ticket) { flex: 0 0 86%; scroll-snap-align: start; }
  .home-route-panel__actions > * { flex: 1 1 150px; justify-content: center; }
  .route-value { padding: 22px 16px; border-radius: 24px; }
  .route-folio__heading { flex-direction: column; }
}
</style>
