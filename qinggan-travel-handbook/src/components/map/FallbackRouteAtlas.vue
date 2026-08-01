<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { MapPinned } from '@lucide/vue'
import VisitedToggle from '@/components/common/VisitedToggle.vue'
import { routeCombinations } from '@/data/combinations'
import { placeById } from '@/data/places'
import { routeLineStyles } from '@/data/placeClassifications'
import type { JourneyRoute, Place, RouteScope } from '@/types/content'

const props = defineProps<{ visitedIds: string[]; route: JourneyRoute; places: Place[]; selectedId?: string | null }>()
const emit = defineEmits<{ select: [placeId: string] }>()
const atlasScroller = ref<HTMLElement>()
const atlas = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
let resizeObserver: ResizeObserver | undefined

const routePlaces = computed(() => props.route.placeIds.map((id) => placeById.get(id)).filter((place): place is Place => Boolean(place?.classification.isStandalone)))
const displayPlaces = computed(() => props.places.filter((place) => place.classification.isStandalone))
const visitedSet = computed(() => new Set(props.visitedIds))

function position(coordinates: readonly [number, number]): { left: string; top: string } {
  const [longitude, latitude] = coordinates
  const longitudes = routePlaces.value.map((place) => place.coordinates[0])
  const latitudes = routePlaces.value.map((place) => place.coordinates[1])
  const minLng = Math.min(...longitudes) - .5
  const maxLng = Math.max(...longitudes) + .5
  const minLat = Math.min(...latitudes) - .35
  const maxLat = Math.max(...latitudes) + .35
  const left = 8 + ((longitude - minLng) / Math.max(maxLng - minLng, 1)) * 84
  const top = 92 - ((latitude - minLat) / Math.max(maxLat - minLat, 1)) * 80
  return { left: `${left}%`, top: `${top}%` }
}

function markerPosition(place: Place): { left: string; top: string } {
  const base = position(place.coordinates)
  const nearby = displayPlaces.value.filter((candidate) => (
    Math.abs(candidate.coordinates[0] - place.coordinates[0]) < 0.65
    && Math.abs(candidate.coordinates[1] - place.coordinates[1]) < 0.45
  ))
  if (nearby.length < 2) return base

  const clusterIndex = nearby.findIndex((candidate) => candidate.id === place.id)
  const offsets = [
    { x: -42, y: -24 },
    { x: 42, y: -24 },
    { x: 0, y: 36 },
    { x: -44, y: 34 },
    { x: 44, y: 34 },
  ]
  const offset = offsets[clusterIndex % offsets.length] ?? { x: 0, y: 0 }
  return {
    left: `calc(${base.left} + ${offset.x}px)`,
    top: `calc(${base.top} + ${offset.y}px)`,
  }
}

interface CanvasRouteSegment {
  scope: RouteScope
  places: Place[]
}

const routeSegments = computed<CanvasRouteSegment[]>(() => {
  const segments: CanvasRouteSegment[] = []
  for (let index = 1; index < routePlaces.value.length; index += 1) {
    const previous = routePlaces.value[index - 1]!
    const current = routePlaces.value[index]!
    const scope = current.classification.routeScope
    const last = segments.at(-1)
    if (last?.scope === scope) last.places.push(current)
    else segments.push({ scope, places: [previous, current] })
  }
  return segments
})

function drawRoute(): void {
  if (!canvas.value || !atlas.value) return
  const rect = atlas.value.getBoundingClientRect()
  const ratio = Math.min(devicePixelRatio || 1, 2)
  canvas.value.width = rect.width * ratio
  canvas.value.height = rect.height * ratio
  const context = canvas.value.getContext('2d')
  if (!context) return
  context.scale(ratio, ratio)
  context.clearRect(0, 0, rect.width, rect.height)
  routeSegments.value.forEach((segment) => {
    const lineStyle = routeLineStyles[segment.scope]
    context.beginPath()
    context.setLineDash(lineStyle.dash)
    segment.places.forEach((place, index) => {
      const style = position(place.coordinates)
      const x = Number.parseFloat(style.left) / 100 * rect.width
      const y = Number.parseFloat(style.top) / 100 * rect.height
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    context.strokeStyle = segment.scope === 'main-route' ? props.route.accent : lineStyle.color
    context.globalAlpha = lineStyle.opacity
    context.lineWidth = segment.scope === 'main-route' ? 4 : 3
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.stroke()
  })
  context.setLineDash([])
  context.globalAlpha = 1
}

onMounted(async () => {
  await nextTick()
  drawRoute()
  if (atlasScroller.value) {
    atlasScroller.value.scrollLeft = atlasScroller.value.scrollWidth - atlasScroller.value.clientWidth
  }
  resizeObserver = new ResizeObserver(drawRoute)
  if (atlas.value) resizeObserver.observe(atlas.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div class="fallback-atlas">
    <div ref="atlasScroller" class="atlas-map-scroll" tabindex="0" aria-label="横向浏览路线示意图">
      <section ref="atlas" class="atlas-map" aria-label="青甘环线地理示意图">
        <canvas ref="canvas" aria-hidden="true"></canvas>
        <div class="atlas-map__wash" aria-hidden="true"></div>
        <button
          v-for="(place, index) in displayPlaces"
          :key="place.id"
          type="button"
          class="atlas-marker"
          :class="{ 'is-visited': visitedSet.has(place.id), 'is-highlight': place.category === '沿途彩蛋', 'is-selected': selectedId === place.id }"
          :style="markerPosition(place)"
          :aria-label="`查看${place.name}`"
          @click="emit('select', place.id)"
        >
          {{ index + 1 }}<span>{{ place.name }}</span>
        </button>
        <div class="atlas-map__legend"><MapPinned :size="18" /><span>路线示意，非导航地图</span></div>
      </section>
    </div>

    <section class="atlas-route-list">
      <header><p class="eyebrow">ROUTE INDEX · {{ route.shortName }}</p><h2>完整图文路线</h2><p>{{ route.description }}</p></header>
      <article v-for="(place, index) in displayPlaces" :key="place.id">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <button type="button" @click="emit('select', place.id)">
          <strong>{{ place.name }}</strong><small>{{ place.value.reasonToVisit }}</small>
        </button>
        <VisitedToggle :place-id="place.id" compact />
      </article>
    </section>

    <section class="atlas-combinations">
      <p class="eyebrow">顺路组合</p>
      <h2>路线可以这样自然衔接</h2>
      <div>
        <article v-for="item in routeCombinations" :key="item.id">
          <h3>{{ item.title }}</h3><p>{{ item.note }}</p><small>{{ item.pacing }}</small>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fallback-atlas { display: grid; gap: 24px; }
.atlas-map-scroll {
  min-width: 0;
  overflow-x: auto;
  border-radius: 28px;
  scrollbar-color: color-mix(in srgb, var(--lake) 35%, transparent) transparent;
}
.atlas-map {
  position: relative;
  width: 720px;
  min-height: 520px;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(ellipse at 32% 66%, rgb(80 137 139 / 20%), transparent 24%),
    repeating-radial-gradient(ellipse at 40% 54%, transparent 0 24px, rgb(53 42 36 / 5%) 25px 26px),
    #e7dcc8;
}
.atlas-map canvas { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; }
.atlas-map__wash { position: absolute; inset: 0; background: linear-gradient(145deg, transparent 0 55%, rgb(146 104 65 / 14%) 56%); }
.atlas-marker {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 3px solid var(--paper);
  border-radius: 50%;
  color: #fff;
  background: var(--ink);
  box-shadow: 0 6px 14px rgb(53 42 36 / 18%);
  font-size: 0.7rem;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.atlas-marker span { display: none; position: absolute; top: 35px; left: 50%; width: max-content; max-width: 100px; color: var(--ink); font-size: 0.64rem; font-weight: 700; transform: translateX(-50%); }
.atlas-marker.is-visited { background: var(--lake); }
.atlas-marker.is-highlight { border-radius: 9px; background: var(--sunset); }
.atlas-marker.is-selected { outline: 4px solid rgb(45 127 123 / 28%); transform: translate(-50%, -50%) scale(1.14); }
.atlas-map__legend { position: absolute; z-index: 4; right: 14px; bottom: 14px; display: flex; align-items: center; gap: 6px; padding: 9px 12px; border-radius: 999px; color: var(--muted); background: rgb(247 240 229 / 86%); font-size: 0.7rem; }

.atlas-route-list { padding: 24px; border: 1px solid var(--line); border-radius: 28px; background: rgb(255 255 255 / 38%); }
.atlas-route-list h2 { margin-bottom: 20px; font-size: 2rem; }
.atlas-route-list header > p:last-child { color: var(--muted); font-size: .82rem; }
.atlas-route-list article { display: grid; grid-template-columns: 38px minmax(0, 1fr); align-items: center; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line); }
.atlas-route-list article > span { color: var(--sunset); font: 700 0.78rem/1 var(--serif); }
.atlas-route-list article button:not(.visited-toggle), .atlas-route-list article > div { display: grid; gap: 3px; padding: 0; border: 0; text-align: left; background: none; cursor: pointer; }
.atlas-route-list article small { color: var(--muted); }
.atlas-route-list article :deep(.visited-toggle) { grid-column: 2; justify-self: start; }

.atlas-combinations { padding: 28px 0; }
.atlas-combinations h2 { font-size: clamp(2rem, 5vw, 3.5rem); }
.atlas-combinations > div { display: grid; gap: 12px; }
.atlas-combinations article { padding: 20px; border: 1px solid var(--line); border-radius: 18px; background: rgb(255 255 255 / 34%); }
.atlas-combinations h3 { margin-bottom: 8px; }
.atlas-combinations p { margin-bottom: 7px; color: var(--muted); }
.atlas-combinations small { color: var(--sunset); }

@media (min-width: 720px) {
  .fallback-atlas { grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr); align-items: start; }
  .atlas-map-scroll { position: sticky; top: 90px; overflow: visible; }
  .atlas-map { width: 100%; min-height: 650px; }
  .atlas-route-list article { grid-template-columns: 38px minmax(0, 1fr) auto; }
  .atlas-route-list article :deep(.visited-toggle) { grid-column: auto; }
  .atlas-combinations { grid-column: 1 / -1; }
  .atlas-combinations > div { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1100px) {
  .atlas-marker span {
    display: block;
    padding: 4px 7px;
    border-radius: 8px;
    background: rgb(247 240 229 / 94%);
    box-shadow: 0 4px 12px rgb(53 42 36 / 12%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease, transform 160ms ease;
  }
  .atlas-marker:hover span,
  .atlas-marker:focus-visible span {
    opacity: 1;
    transform: translate(-50%, 3px);
  }
}
</style>
