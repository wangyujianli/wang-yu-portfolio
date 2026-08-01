<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { introFeatures, introStages, type IntroStageId } from '@/data/intro'
import { publicAssetUrl } from '@/lib/publicAssets'
import IntroRoute from './IntroRoute.vue'

const emit = defineEmits<{ complete: [] }>()

const stageIndex = ref(0)
const featureIndex = ref(0)
const exploredCount = ref(12)
const reducedMotion = ref(false)
const fast = ref(false)

let stageTimer: ReturnType<typeof setTimeout> | undefined
let featureTimer: ReturnType<typeof setInterval> | undefined
let countTimer: ReturnType<typeof setTimeout> | undefined
let previousBodyOverflow = ''

const stage = computed<IntroStageId>(() => introStages[stageIndex.value]?.id ?? 'opening')
const feature = computed(() => introFeatures[featureIndex.value] ?? introFeatures[0]!)
const backdropUrl = publicAssetUrl('assets/intro/riyueshan-prayer-flags.webp')

function clearTimers() {
  clearTimeout(stageTimer)
  clearInterval(featureTimer)
  clearTimeout(countTimer)
}

function beginFeatureSequence() {
  featureIndex.value = 0
  featureTimer = setInterval(() => {
    featureIndex.value = (featureIndex.value + 1) % introFeatures.length
  }, 1000)
}

function renderStage(index: number) {
  clearTimers()
  fast.value = false
  stageIndex.value = Math.min(index, introStages.length - 1)
  exploredCount.value = 12

  if (stage.value === 'travel-content') beginFeatureSequence()
  if (stage.value === 'footprint') {
    countTimer = setTimeout(() => { exploredCount.value = 13 }, 420)
  }

  const duration = introStages[stageIndex.value]?.duration
  if (duration !== null && duration !== undefined) {
    stageTimer = setTimeout(() => renderStage(stageIndex.value + 1), duration)
  }
}

function accelerate(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('button')) return
  if (stage.value === 'blessing' || reducedMotion.value) return
  fast.value = true
  clearTimeout(stageTimer)
  stageTimer = setTimeout(() => renderStage(stageIndex.value + 1), 160)
}

function finish() {
  clearTimers()
  emit('complete')
}

onMounted(() => {
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion.value) {
    stageIndex.value = introStages.findIndex((item) => item.id === 'blessing')
  } else {
    renderStage(0)
  }
})

onBeforeUnmount(() => {
  clearTimers()
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <section
    class="intro-experience"
    :class="[{ 'intro-experience--fast': fast, 'intro-experience--reduced': reducedMotion }, `intro-experience--${stage}`]"
    aria-label="青甘大环线旅行手册序章"
    aria-live="polite"
    @click="accelerate"
  >
    <div class="intro-backdrop" aria-hidden="true">
      <img
        class="intro-backdrop__image"
        :src="backdropUrl"
        alt=""
        width="1080"
        height="1440"
        decoding="async"
        fetchpriority="high"
      />
    </div>
    <div class="intro-experience__wash" aria-hidden="true"></div>
    <div class="intro-experience__vignette" aria-hidden="true"></div>
    <div class="intro-experience__grain" aria-hidden="true"></div>

    <button class="intro-skip" type="button" @click.stop="finish">跳过</button>

    <header class="intro-title">
      <p>THE WESTWARD FIELD NOTES · 2026</p>
      <h1>青甘大环线<br />旅行手册</h1>
      <span>先看路线，再慢慢选择喜欢的风景。</span>
    </header>

    <section class="intro-panel intro-panel--routes" :aria-hidden="stage !== 'route-choice'">
      <p class="intro-panel__eyebrow">先选一条看风景的方式</p>
      <h2>两条路线，同一个远方</h2>
      <div class="intro-route-options">
        <article class="intro-route-option intro-route-option--gold">
          <strong>五星热门路线</strong>
          <p>经典景观集中，第一次走青甘也能从容判断。</p>
        </article>
        <article class="intro-route-option intro-route-option--green">
          <strong>优选探索路线</strong>
          <p>减少相似风景，把时间留给更有变化的西北。</p>
        </article>
      </div>
    </section>

    <section class="intro-panel intro-panel--features" :aria-hidden="stage !== 'travel-content'">
      <p class="intro-panel__eyebrow">一路需要的，都沿路线收好</p>
      <h2>{{ feature.title }}</h2>
      <p class="intro-panel__copy">{{ feature.copy }}</p>
      <div class="intro-feature-rail" aria-label="网站内容">
        <span :class="{ active: feature.id === 'scenic' }">景点</span>
        <span :class="{ active: feature.id === 'scenic' }">拍照</span>
        <span :class="{ active: feature.id === 'food' }">小吃</span>
        <span :class="{ active: feature.id === 'souvenir' }">纪念品</span>
        <span :class="{ active: feature.id === 'souvenir' }">贴心提示</span>
      </div>
    </section>

    <section class="intro-panel intro-panel--footprint" :aria-hidden="stage !== 'footprint'">
      <p class="intro-panel__eyebrow">走过的地方，轻轻点亮</p>
      <h2>只记已去，不催下一程</h2>
      <p class="intro-panel__copy">这里只记录“已去”与“未去”。还没抵达的风景，留给下一次出发。</p>
      <div class="intro-footprint">
        <span>已去</span>
        <strong>{{ exploredCount }}<small>/ 30 个地点</small></strong>
      </div>
    </section>

    <IntroRoute :stage="stage" />

    <section class="intro-blessing" :aria-hidden="stage !== 'blessing'">
      <i aria-hidden="true"></i>
      <h2>愿此行山河辽阔，平安顺遂。</h2>
      <p>愿每一次出发，都有风景；每一次抵达，都有欢喜。</p>
      <button type="button" @click.stop="finish">开启青甘之旅</button>
      <small>路线不必走得完全，喜欢的风景，才是自己的远方。</small>
    </section>

    <p class="intro-location">日月山 · 青海</p>
  </section>
</template>

<style scoped>
.intro-experience {
  --ivory: #f6efe2;
  --gold: #dfb46e;
  --green: #88aa8c;
  position: fixed;
  z-index: 1000;
  inset: 0;
  min-width: 320px;
  min-height: 100svh;
  overflow: hidden;
  isolation: isolate;
  color: var(--ivory);
  background: #0c2133;
}

.intro-backdrop,
.intro-backdrop__image,
.intro-experience__wash,
.intro-experience__vignette,
.intro-experience__grain { position: absolute; inset: 0; }

.intro-backdrop { z-index: -5; overflow: hidden; background: #102738; }
.intro-backdrop__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 58%;
  filter: saturate(.72) contrast(1.08) brightness(.68);
  transform: scale(1.02);
  transition: filter 1.8s ease, transform 8s ease;
}
.intro-experience--blessing .intro-backdrop__image {
  filter: saturate(.78) contrast(1.04) brightness(.78);
  transform: scale(1.055);
}
.intro-experience__wash {
  z-index: -4;
  background:
    linear-gradient(90deg, rgba(6,22,36,.93), rgba(8,27,40,.7) 43%, rgba(10,29,40,.2) 75%),
    linear-gradient(180deg, rgba(7,24,38,.42), transparent 46%, rgba(8,23,32,.65));
  transition: background 1.6s ease;
}
.intro-experience--blessing .intro-experience__wash {
  background:
    linear-gradient(90deg, rgba(12,32,43,.82), rgba(74,56,39,.32) 64%, rgba(150,100,52,.18)),
    linear-gradient(180deg, rgba(12,31,42,.34), rgba(90,62,39,.22), rgba(17,31,34,.58));
}
.intro-experience__vignette { z-index: -3; box-shadow: inset 0 0 150px 28px rgba(4,15,24,.58); pointer-events: none; }
.intro-experience__grain {
  z-index: 30;
  opacity: .13;
  pointer-events: none;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.17'/%3E%3C/svg%3E");
}

.intro-skip {
  position: absolute;
  z-index: 50;
  top: max(18px, env(safe-area-inset-top));
  right: clamp(18px,4vw,54px);
  min-width: 70px;
  min-height: 44px;
  border: 1px solid rgba(246,239,226,.32);
  border-radius: 999px;
  color: rgba(246,239,226,.86);
  background: rgba(10,28,40,.28);
  cursor: pointer;
  backdrop-filter: blur(12px);
}

.intro-title,
.intro-panel,
.intro-blessing { position: absolute; z-index: 12; transition: opacity .8s ease, transform .9s ease, filter .8s ease; }
.intro-title { top: clamp(76px,13vh,132px); left: clamp(24px,7vw,108px); width: min(680px,calc(100% - 48px)); }
.intro-title p,
.intro-panel__eyebrow { margin: 0 0 17px; color: var(--gold); font-size: clamp(.68rem,1.1vw,.82rem); font-weight: 700; letter-spacing: .2em; }
.intro-title h1 { margin: 0; font: 600 clamp(3.4rem,7.5vw,7.4rem)/1.02 var(--serif); letter-spacing: -.04em; text-wrap: balance; }
.intro-title span { display: block; margin-top: 24px; color: rgba(246,239,226,.76); font-size: clamp(.94rem,1.5vw,1.12rem); letter-spacing: .08em; }
.intro-experience:not(.intro-experience--opening) .intro-title { opacity: .22; transform: translateY(-34px) scale(.72); transform-origin: left top; filter: blur(.4px); }

.intro-panel { top: clamp(220px,34vh,350px); left: clamp(24px,7vw,108px); width: min(700px,calc(100% - 48px)); opacity: 0; transform: translateY(20px); pointer-events: none; }
.intro-panel h2 { margin: 0; font: 600 clamp(2rem,4.2vw,4rem)/1.2 var(--serif); text-wrap: balance; }
.intro-panel__copy { max-width: 620px; margin: 16px 0 0; color: rgba(246,239,226,.74); line-height: 1.8; }
.intro-experience--route-choice .intro-panel--routes,
.intro-experience--travel-content .intro-panel--features,
.intro-experience--footprint .intro-panel--footprint { opacity: 1; transform: none; pointer-events: auto; }

.intro-route-options { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 30px; }
.intro-route-option { position: relative; padding-top: 17px; border-top: 1px solid rgba(246,239,226,.28); }
.intro-route-option::before { position: absolute; top: -2px; left: 0; width: 56px; height: 3px; border-radius: 5px; content: ''; }
.intro-route-option--gold::before { background: var(--gold); }
.intro-route-option--green::before { background: var(--green); }
.intro-route-option strong { font: 600 1.18rem/1.4 var(--serif); }
.intro-route-option p { margin: 8px 0 0; color: rgba(246,239,226,.7); font-size: .88rem; line-height: 1.65; }

.intro-feature-rail { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.intro-feature-rail span { padding: 8px 12px; border: 1px solid rgba(246,239,226,.22); border-radius: 999px; color: rgba(246,239,226,.62); font-size: .78rem; transition: .35s ease; }
.intro-feature-rail span.active { border-color: rgba(223,180,110,.8); color: #fff5df; background: rgba(223,180,110,.15); }

.intro-footprint { display: flex; align-items: center; gap: 24px; margin-top: 24px; }
.intro-footprint > span { display: grid; width: 68px; height: 68px; place-items: center; border: 1px solid #a5c6a6; border-radius: 50%; color: #e7f2df; background: rgba(91,136,98,.24); font: 700 .9rem/1 var(--serif); letter-spacing: .12em; transform: rotate(-8deg); }
.intro-footprint strong { font: 500 clamp(2.5rem,5vw,4.8rem)/1 var(--serif); }
.intro-footprint small { margin-left: 8px; color: rgba(246,239,226,.68); font: 400 .86rem/1.2 var(--sans); }

.intro-blessing { inset: 50% auto auto 50%; width: min(860px,calc(100% - 44px)); opacity: 0; transform: translate(-50%,-42%); text-align: center; pointer-events: none; }
.intro-experience--blessing .intro-blessing { opacity: 1; transform: translate(-50%,-50%); pointer-events: auto; }
.intro-blessing i { display: block; width: 56px; height: 1px; margin: 0 auto 26px; background: var(--gold); }
.intro-blessing h2 { margin: 0; font: 600 clamp(2.4rem,5.8vw,5.2rem)/1.2 var(--serif); text-wrap: balance; }
.intro-blessing p { margin: 22px auto 0; color: rgba(246,239,226,.78); font-size: clamp(.96rem,1.6vw,1.16rem); line-height: 1.8; }
.intro-blessing button { min-width: 190px; min-height: 52px; margin-top: 34px; border: 0; border-radius: 999px; color: #273027; background: #f5e7cf; font-weight: 700; cursor: pointer; box-shadow: 0 12px 34px rgba(4,15,24,.22); }
.intro-blessing small { display: block; margin: 17px auto 0; color: rgba(246,239,226,.62); line-height: 1.6; }
.intro-location { position: absolute; z-index: 14; right: clamp(24px,5vw,72px); bottom: 26px; margin: 0; color: rgba(246,239,226,.56); font-size: .7rem; letter-spacing: .18em; }

.intro-experience--fast :is(.intro-title,.intro-panel,.intro-blessing) { transition-duration: .22s !important; }

@media (max-width: 680px) {
  .intro-backdrop__image { object-position: 52% center; }
  .intro-experience__wash { background: linear-gradient(180deg,rgba(6,22,36,.89),rgba(8,26,38,.48) 54%,rgba(8,22,31,.82)); }
  .intro-experience__vignette { box-shadow: inset 0 0 90px 16px rgba(4,15,24,.55); }
  .intro-title { top: 92px; left: 23px; }
  .intro-title h1 { max-width: 340px; font-size: clamp(2.7rem,12vw,4rem); line-height: 1.18; }
  .intro-title span { max-width: 320px; margin-top: 16px; font-size: .9rem; }
  .intro-experience:not(.intro-experience--opening) .intro-title { transform: translateY(-26px) scale(.66); }
  .intro-panel { top: 242px; left: 23px; width: calc(100% - 46px); }
  .intro-panel h2 { font-size: clamp(1.75rem,8.3vw,2.45rem); }
  .intro-panel__copy { font-size: .88rem; line-height: 1.7; }
  .intro-route-options { grid-template-columns: 1fr; gap: 15px; margin-top: 20px; }
  .intro-route-option { padding-top: 10px; }
  .intro-route-option p { font-size: .76rem; }
  .intro-feature-rail { gap: 7px; margin-top: 20px; }
  .intro-feature-rail span { padding: 7px 9px; font-size: .68rem; }
  .intro-footprint { gap: 17px; }
  .intro-footprint > span { width: 60px; height: 60px; }
  .intro-blessing { padding-bottom: 10px; }
  .intro-blessing h2 { font-size: clamp(2.05rem,10vw,3.2rem); }
  .intro-blessing p { max-width: 330px; font-size: .92rem; }
  .intro-blessing small { max-width: 310px; }
  .intro-location { right: 22px; bottom: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .intro-experience *, .intro-experience *::before, .intro-experience *::after { transition: none !important; }
  .intro-title, .intro-panel { display: none; }
  .intro-blessing { opacity: 1; transform: translate(-50%,-50%); pointer-events: auto; }
}
</style>
