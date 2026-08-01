<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { BusFront, Check, Plane } from '@lucide/vue'
import gsap from 'gsap'
import { placeById } from '@/data/places'
import type { Coordinates, HomeJourneyRoute, Place } from '@/types/content'

const props = defineProps<{
  route: HomeJourneyRoute
  visitedIds: string[]
}>()

const mapRoot = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const van = ref<HTMLElement>()
let resizeObserver: ResizeObserver | undefined
let vanTween: gsap.core.Tween | undefined

const routePlaces = computed(() => props.route.placeIds
  .map((id) => placeById.get(id))
  .filter((place): place is Place => Boolean(place)))

const uniquePlaces = computed(() => routePlaces.value.filter((place, index, source) => (
  source.findIndex((candidate) => candidate.id === place.id) === index
)))

const visitedSet = computed(() => new Set(props.visitedIds))
const labelledPlaceIds = computed(() => new Set(props.route.id === 'discovery'
  ? ['riyue-mountain', 'qinghai-lake', 'dachaidan-emerald', 'wusute-yadan', 'black-mountain', 'lenghu-oil-town', 'mingsha-crescent', 'zhangye-danxia']
  : ['qinghai-lake', 'chaka-salt-lake', 'dachaidan-emerald', 'wusute-yadan', 'mingsha-crescent', 'jiayuguan-pass', 'zhangye-danxia', 'qilian-grassland']))

function project([longitude, latitude]: Coordinates): { x: number; y: number } {
  const longitudes = routePlaces.value.map((place) => place.coordinates[0])
  const latitudes = routePlaces.value.map((place) => place.coordinates[1])
  const minLng = Math.min(...longitudes) - 0.7
  const maxLng = Math.max(...longitudes) + 0.7
  const minLat = Math.min(...latitudes) - 0.45
  const maxLat = Math.max(...latitudes) + 0.45

  return {
    x: 8 + ((longitude - minLng) / Math.max(maxLng - minLng, 1)) * 84,
    y: 90 - ((latitude - minLat) / Math.max(maxLat - minLat, 1)) * 78,
  }
}

function markerStyle(place: Place, index: number): Record<string, string> {
  const point = project(place.coordinates)
  const labelAbove = index % 2 === 0
  return {
    left: `${point.x}%`,
    top: `${point.y}%`,
    '--label-shift': labelAbove ? '-100%' : '14px',
  }
}

function drawRoute(): void {
  if (!canvas.value || !mapRoot.value) return
  const rect = mapRoot.value.getBoundingClientRect()
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.max(rect.width * ratio, 1)
  canvas.value.height = Math.max(rect.height * ratio, 1)
  const context = canvas.value.getContext('2d')
  if (!context) return

  context.scale(ratio, ratio)
  context.clearRect(0, 0, rect.width, rect.height)
  const points = routePlaces.value.map((place) => project(place.coordinates))

  const trace = (): void => {
    context.beginPath()
    points.forEach((point, index) => {
      const x = point.x / 100 * rect.width
      const y = point.y / 100 * rect.height
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
  }

  trace()
  context.strokeStyle = 'rgba(255, 250, 239, .92)'
  context.lineWidth = 10
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.stroke()

  trace()
  context.strokeStyle = props.route.accent
  context.lineWidth = 3.5
  context.setLineDash([8, 7])
  context.stroke()
  context.setLineDash([])
}

function pointAt(progress: number): { x: number; y: number } {
  const points = routePlaces.value.map((place) => project(place.coordinates))
  if (points.length < 2) return points[0] ?? { x: 50, y: 50 }
  const scaled = Math.min(Math.max(progress, 0), 1) * (points.length - 1)
  const index = Math.min(Math.floor(scaled), points.length - 2)
  const local = scaled - index
  const start = points[index]!
  const end = points[index + 1]!
  return {
    x: start.x + (end.x - start.x) * local,
    y: start.y + (end.y - start.y) * local,
  }
}

function positionVan(progress: number): void {
  if (!van.value) return
  const point = pointAt(progress)
  van.value.style.left = `${point.x}%`
  van.value.style.top = `${point.y}%`
}

function animateVan(): void {
  vanTween?.kill()
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (reducedMotion) {
    positionVan(0.58)
    return
  }

  const travel = { progress: 0.02 }
  positionVan(travel.progress)
  vanTween = gsap.to(travel, {
    progress: 0.72,
    duration: 2.4,
    ease: 'power1.inOut',
    onUpdate: () => positionVan(travel.progress),
  })
}

async function refreshMap(): Promise<void> {
  await nextTick()
  drawRoute()
  animateVan()
}

watch(() => props.route.id, refreshMap)
watch(() => props.visitedIds, drawRoute, { deep: true })

onMounted(async () => {
  await refreshMap()
  if ('ResizeObserver' in window && mapRoot.value) {
    resizeObserver = new ResizeObserver(drawRoute)
    resizeObserver.observe(mapRoot.value)
  }
})

onBeforeUnmount(() => {
  vanTween?.kill()
  resizeObserver?.disconnect()
})
</script>

<template>
  <section
    ref="mapRoot"
    class="home-route-map"
    :class="`home-route-map--${route.tone}`"
    data-home-route-map
    :data-route-id="route.id"
    :aria-label="`${route.name}地点地图`"
  >
    <canvas ref="canvas" aria-hidden="true"></canvas>

    <div class="home-route-map__flight" aria-label="杭州乘飞机抵达西宁">
      <span>杭州</span><Plane :size="16" aria-hidden="true" /><span>西宁</span>
    </div>

    <div class="home-route-map__terrain" aria-hidden="true">
      <span>河西走廊</span>
      <span>柴达木盆地</span>
      <span>青海湖</span>
    </div>

    <RouterLink
      v-for="(place, index) in uniquePlaces"
      :key="place.id"
      :to="`/places/${place.slug}`"
      class="home-route-map__marker"
      :class="{ 'is-visited': visitedSet.has(place.id), 'is-labelled': labelledPlaceIds.has(place.id) }"
      :style="markerStyle(place, index)"
      :data-place-id="place.id"
      :aria-label="`${place.name}${visitedSet.has(place.id) ? '，已去过' : '，未去'}`"
    >
      <span class="home-route-map__dot">
        <Check v-if="visitedSet.has(place.id)" :size="13" :stroke-width="3" aria-hidden="true" />
        <i v-else>{{ index + 1 }}</i>
      </span>
      <strong>{{ place.name }}</strong>
    </RouterLink>

    <span ref="van" class="home-route-map__van" aria-hidden="true">
      <BusFront :size="21" :stroke-width="1.8" />
    </span>

    <footer>
      <span>{{ route.placeIds.length - 1 }} 段风景</span>
      <span>节点按真实经纬度排布</span>
    </footer>
  </section>
</template>

<style scoped>
.home-route-map {
  position: relative;
  min-width: 0;
  min-height: 520px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
  border-radius: 30px;
  background-color: #e9dcc2;
  box-shadow: 0 24px 60px rgb(62 47 36 / 14%);
  isolation: isolate;
}

.home-route-map::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  border: 12px solid rgb(255 250 239 / 28%);
  border-radius: inherit;
  content: '';
}

.home-route-map canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.home-route-map__flight {
  position: absolute;
  z-index: 4;
  top: 18px;
  left: 18px;
  display: flex;
  min-height: 38px;
  align-items: center;
  gap: 8px;
  padding: 0 13px;
  border: 1px solid rgb(80 63 48 / 16%);
  border-radius: 999px;
  color: var(--muted);
  background: rgb(248 241 228 / 88%);
  font-size: .72rem;
  letter-spacing: .08em;
}

.home-route-map__terrain span {
  position: absolute;
  z-index: 1;
  color: rgb(81 65 51 / 30%);
  font: 700 .72rem/1 var(--serif);
  letter-spacing: .18em;
  pointer-events: none;
}

.home-route-map__terrain span:nth-child(1) { top: 22%; left: 45%; }
.home-route-map__terrain span:nth-child(2) { right: 23%; bottom: 26%; }
.home-route-map__terrain span:nth-child(3) { bottom: 18%; left: 13%; }

.home-route-map__marker {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 50%;
  color: var(--ink);
  text-decoration: none;
  transform: translate(-50%, -50%);
}

.home-route-map__dot {
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
  border: 3px solid #f7efdf;
  border-radius: 50%;
  color: #fff;
  background: var(--route-accent, #5f5147);
  box-shadow: 0 5px 13px rgb(62 47 36 / 22%);
}

.home-route-map--gold { --route-accent: #c38a2f; }
.home-route-map--green { --route-accent: #6f875f; }

.home-route-map__dot i {
  font: 700 .62rem/1 var(--sans);
  font-style: normal;
}

.home-route-map__marker strong {
  position: absolute;
  top: 50%;
  left: 50%;
  width: max-content;
  max-width: 112px;
  padding: 4px 7px;
  border-radius: 7px;
  color: var(--ink);
  background: rgb(248 241 228 / 90%);
  box-shadow: 0 3px 9px rgb(53 42 36 / 9%);
  font-size: .64rem;
  line-height: 1.25;
  text-align: center;
  transform: translate(-50%, var(--label-shift));
  opacity: 0;
  pointer-events: none;
}

.home-route-map__marker.is-labelled strong { opacity: 1; }

.home-route-map__marker.is-visited .home-route-map__dot {
  background: var(--lake);
}

.home-route-map__marker:hover,
.home-route-map__marker:focus-visible {
  z-index: 8;
}

.home-route-map__marker:hover .home-route-map__dot,
.home-route-map__marker:focus-visible .home-route-map__dot {
  transform: scale(1.12);
}

.home-route-map__marker:hover strong,
.home-route-map__marker:focus-visible strong { opacity: 1; }

.home-route-map__van {
  position: absolute;
  z-index: 7;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 2px solid #f7efdf;
  border-radius: 13px;
  color: #fff;
  background: #345b75;
  box-shadow: 0 8px 18px rgb(38 56 69 / 24%);
  transform: translate(-50%, -50%) rotate(-3deg);
}

.home-route-map footer {
  position: absolute;
  z-index: 4;
  right: 16px;
  bottom: 14px;
  left: 16px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
  font-size: .67rem;
}

@media (max-width: 719px) {
  .home-route-map { min-height: 430px; border-radius: 24px; }
  .home-route-map__marker strong { display: none; }
  .home-route-map__terrain span { display: none; }
  .home-route-map footer { font-size: .62rem; }
}

@media (prefers-reduced-motion: reduce) {
  .home-route-map__marker,
  .home-route-map__dot,
  .home-route-map__van { transition: none; }
}
</style>
