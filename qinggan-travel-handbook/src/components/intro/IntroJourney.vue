<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Plane, SkipForward } from '@lucide/vue'
import gsap from 'gsap'
import { routeStops } from '@/data/route'
import { useIntroStore } from '@/stores/intro'
import type { Coordinates } from '@/types/content'

interface GeoFeature {
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
}

const canvas = ref<HTMLCanvasElement>()
const plane = ref<HTMLElement>()
const root = ref<HTMLElement>()
const introStore = useIntroStore()
const route = useRoute()
const router = useRouter()
const mapFeature = ref<GeoFeature>()
const drawing = { flight: 0, route: 0 }
let timeline: gsap.core.Timeline | undefined

const hangzhou: Coordinates = [120.1551, 30.2741]
const xining: Coordinates = [101.7782, 36.6171]
const westRoute = routeStops.filter((stop) => stop.kind === 'route').map((stop) => stop.coordinates)

function project([longitude, latitude]: readonly number[], width: number, height: number): [number, number] {
  const minLon = 73
  const maxLon = 135
  const minLat = 18
  const maxLat = 54
  const x = ((longitude! - minLon) / (maxLon - minLon)) * width * 0.84 + width * 0.08
  const y = height * 0.9 - ((latitude! - minLat) / (maxLat - minLat)) * height * 0.78
  return [x, y]
}

function drawRing(context: CanvasRenderingContext2D, ring: number[][], width: number, height: number): void {
  ring.forEach((point, index) => {
    const [x, y] = project(point, width, height)
    if (index === 0) context.moveTo(x, y)
    else context.lineTo(x, y)
  })
  context.closePath()
}

function drawMap(context: CanvasRenderingContext2D, width: number, height: number): void {
  const feature = mapFeature.value
  if (!feature) return
  const polygons = feature.geometry.type === 'Polygon'
    ? [feature.geometry.coordinates as number[][][]]
    : feature.geometry.coordinates as number[][][][]

  context.save()
  context.beginPath()
  for (const polygon of polygons) for (const ring of polygon) drawRing(context, ring, width, height)
  context.fillStyle = 'rgba(238, 220, 191, .68)'
  context.strokeStyle = 'rgba(83, 64, 49, .56)'
  context.lineWidth = 1.2
  context.fill('evenodd')
  context.stroke()
  context.restore()
}

function quadraticPoint(start: Coordinates, end: Coordinates, t: number, width: number, height: number): [number, number] {
  const [sx, sy] = project(start, width, height)
  const [ex, ey] = project(end, width, height)
  const cx = (sx + ex) / 2
  const cy = Math.min(sy, ey) - height * 0.2
  const one = 1 - t
  return [one * one * sx + 2 * one * t * cx + t * t * ex, one * one * sy + 2 * one * t * cy + t * t * ey]
}

function drawScene(): void {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(rect.width, 1)
  const height = Math.max(rect.height, 1)
  canvas.value.width = width * ratio
  canvas.value.height = height * ratio
  const context = canvas.value.getContext('2d')
  if (!context) return
  context.scale(ratio, ratio)
  context.clearRect(0, 0, width, height)
  drawMap(context, width, height)

  const [hx, hy] = project(hangzhou, width, height)
  const [xx, xy] = project(xining, width, height)
  context.fillStyle = '#d96d3b'
  context.beginPath()
  context.arc(hx, hy, 4.5, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#2d7f7b'
  context.beginPath()
  context.arc(xx, xy, 4.5, 0, Math.PI * 2)
  context.fill()

  context.save()
  context.beginPath()
  for (let i = 0; i <= 80 * drawing.flight; i += 1) {
    const point = quadraticPoint(hangzhou, xining, i / 80, width, height)
    if (i === 0) context.moveTo(...point)
    else context.lineTo(...point)
  }
  context.setLineDash([5, 7])
  context.strokeStyle = '#d96d3b'
  context.lineWidth = 2
  context.stroke()
  context.restore()

  const segments = westRoute.length - 1
  const routeProgress = drawing.route * segments
  context.save()
  context.beginPath()
  for (let index = 0; index < westRoute.length; index += 1) {
    const segmentProgress = Math.min(Math.max(routeProgress - index + 1, 0), 1)
    if (index === 0) {
      context.moveTo(...project(westRoute[index]!, width, height))
      continue
    }
    if (segmentProgress <= 0) break
    const previous = project(westRoute[index - 1]!, width, height)
    const current = project(westRoute[index]!, width, height)
    context.lineTo(
      previous[0] + (current[0] - previous[0]) * segmentProgress,
      previous[1] + (current[1] - previous[1]) * segmentProgress,
    )
  }
  context.strokeStyle = '#d96d3b'
  context.lineWidth = 3
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.stroke()
  context.restore()

  const [px, py] = quadraticPoint(hangzhou, xining, drawing.flight, width, height)
  if (plane.value) plane.value.style.transform = `translate(${px - 13}px, ${py - 13}px) rotate(-22deg)`
}

async function loadMap(): Promise<void> {
  try {
    const response = await fetch('/maps/china-outline.geojson')
    if (response.ok) mapFeature.value = await response.json() as GeoFeature
  } finally {
    drawScene()
  }
}

function completeIntro(): void {
  timeline?.progress(1).pause()
  introStore.complete()
  const target = typeof route.query.to === 'string' && route.query.to.startsWith('/') ? route.query.to : '/'
  void router.replace(target)
}

async function startTimeline(): Promise<void> {
  await nextTick()
  if (!root.value) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    drawing.flight = 1
    drawing.route = 1
    drawScene()
    gsap.set(root.value.querySelectorAll('[data-reveal]'), { autoAlpha: 1, y: 0, scale: 1 })
    return
  }

  timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
  timeline
    .fromTo('.intro-paper', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2 })
    .fromTo('.intro-map', { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.8 })
    .fromTo('.departure-stamp', { autoAlpha: 0, scale: 1.5, rotate: -18 }, { autoAlpha: 1, scale: 1, rotate: -8, duration: 0.55 })
    .to(drawing, { flight: 1, duration: 2.1, ease: 'power1.inOut', onUpdate: drawScene })
    .fromTo('.traveler', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.55 })
    .fromTo('.intro-van', { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.7 }, '<0.1')
    .to('.traveler', { x: 34, y: 12, scale: 0.64, autoAlpha: 0, stagger: 0.06, duration: 0.5 })
    .to(drawing, { route: 1, duration: 2.5, ease: 'none', onUpdate: drawScene }, '<0.1')
    .fromTo('.intro-title > *', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.16, duration: 0.7 })
    .fromTo('.intro-start', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1')
}

function handleResize(): void {
  drawScene()
}

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  await loadMap()
  await startTimeline()
})

onBeforeUnmount(() => {
  timeline?.kill()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section ref="root" class="intro-journey">
    <div class="intro-paper" aria-hidden="true"></div>
    <button type="button" class="intro-skip" @click="completeIntro">
      <SkipForward :size="18" />
      跳过序章
    </button>

    <div class="intro-map">
      <canvas ref="canvas" aria-label="中国轮廓及杭州至西宁、青甘环线动画"></canvas>
      <span class="map-label map-label--hangzhou">杭州</span>
      <span class="map-label map-label--xining">西宁</span>
      <span ref="plane" class="intro-plane"><Plane :size="27" fill="currentColor" /></span>
      <span class="departure-stamp" data-reveal>出发</span>
    </div>

    <div class="intro-cast" aria-label="六位同行者与一辆商务车">
      <div class="traveler-row">
        <span v-for="index in 6" :key="index" class="traveler" :style="{ '--index': index }"></span>
      </div>
      <div class="intro-van"><span></span><i></i><i></i></div>
    </div>

    <div class="intro-title" data-reveal>
      <p>杭州起笔 · 西宁落章</p>
      <h1>向西而行</h1>
      <span>2026 青甘大环线自由探索手册</span>
    </div>

    <button type="button" class="intro-start button-primary" data-reveal @click="completeIntro">
      开始探索
    </button>
  </section>
</template>

<style scoped>
.intro-journey {
  position: relative;
  display: grid;
  min-height: 100svh;
  overflow: hidden;
  place-items: center;
  padding: 68px 18px 32px;
  isolation: isolate;
  background: #ded0bc;
}

.intro-paper {
  position: absolute;
  z-index: -2;
  inset: 0;
  background:
    radial-gradient(circle at 15% 15%, rgb(255 255 255 / 66%), transparent 28rem),
    repeating-linear-gradient(0deg, rgb(58 43 34 / 2%) 0 1px, transparent 1px 7px),
    var(--paper);
}

.intro-paper::after {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 45%, transparent 0 28%, rgb(53 42 36 / 7%) 72%, rgb(53 42 36 / 12%));
  content: '';
  pointer-events: none;
}

.intro-skip {
  position: absolute;
  z-index: 5;
  top: max(16px, env(safe-area-inset-top));
  right: 16px;
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 7px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: rgb(255 255 255 / 54%);
  cursor: pointer;
}

.intro-map {
  position: absolute;
  inset: 7% 4% 29%;
}

.intro-map canvas {
  width: 100%;
  height: 100%;
}

.intro-plane {
  position: absolute;
  top: 0;
  left: 0;
  color: var(--sunset);
  filter: drop-shadow(0 6px 6px rgb(53 42 36 / 20%));
}

.map-label {
  position: absolute;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
}

.map-label--hangzhou {
  right: 11%;
  bottom: 32%;
}

.map-label--xining {
  left: 35%;
  top: 36%;
}

.departure-stamp {
  position: absolute;
  right: 8%;
  bottom: 24%;
  display: grid;
  width: 60px;
  height: 60px;
  place-items: center;
  border: 3px double var(--sunset);
  border-radius: 50%;
  color: var(--sunset);
  font: 700 0.9rem/1 var(--serif);
  letter-spacing: 0.12em;
}

.intro-cast {
  position: absolute;
  z-index: 2;
  bottom: 20%;
  left: 7%;
  display: flex;
  align-items: end;
  gap: 18px;
}

.traveler-row {
  display: flex;
  align-items: end;
  gap: 5px;
}

.traveler {
  --tone: hsl(calc(26 + var(--index) * 24) 34% 44%);
  position: relative;
  display: block;
  width: 15px;
  height: calc(29px + var(--index) * 1px);
  border-radius: 9px 9px 3px 3px;
  background: var(--tone);
}

.traveler::before {
  position: absolute;
  top: -9px;
  left: 3px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #c89572;
  content: '';
}

.intro-van {
  position: relative;
  width: 104px;
  height: 48px;
  border-radius: 14px 20px 8px 8px;
  background: #476c75;
  box-shadow: inset -22px 0 rgb(40 74 82 / 46%);
}

.intro-van::before {
  position: absolute;
  top: 7px;
  right: 9px;
  left: 42px;
  height: 16px;
  border-radius: 8px 12px 3px 3px;
  background: rgb(201 227 232 / 74%);
  content: '';
}

.intro-van i {
  position: absolute;
  bottom: -7px;
  width: 18px;
  height: 18px;
  border: 4px solid #2d2926;
  border-radius: 50%;
  background: #d8cbb8;
}

.intro-van i:first-of-type { left: 16px; }
.intro-van i:last-of-type { right: 14px; }

.intro-title {
  position: relative;
  z-index: 3;
  align-self: end;
  margin-bottom: 62px;
  text-align: center;
}

.intro-title p,
.intro-title span {
  display: block;
  margin: 0;
  color: var(--muted);
  font-size: 0.76rem;
  letter-spacing: 0.16em;
}

.intro-title h1 {
  margin: 8px 0 10px;
  font-size: clamp(3.2rem, 13vw, 7rem);
  letter-spacing: 0.16em;
  text-indent: 0.16em;
}

.intro-start {
  position: absolute;
  z-index: 4;
  bottom: max(24px, env(safe-area-inset-bottom));
  min-width: 168px;
  border: 0;
}

@media (min-width: 720px) {
  .intro-map {
    inset: 4% 4% 14%;
  }

  .intro-cast {
    bottom: 13%;
    left: 10%;
  }

  .intro-title {
    align-self: center;
    justify-self: end;
    width: 48%;
    margin: 0 3% 0 0;
    text-align: left;
  }

  .intro-title h1 {
    text-indent: 0;
  }

  .intro-start {
    right: 12%;
    bottom: 12%;
  }
}
</style>
