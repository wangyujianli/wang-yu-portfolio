<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { MapPinned } from '@lucide/vue'
import VisitedToggle from '@/components/common/VisitedToggle.vue'
import { routeCombinations } from '@/data/combinations'
import { placeById, places } from '@/data/places'
import { routeStops } from '@/data/route'

const props = defineProps<{ visitedIds: string[] }>()
const emit = defineEmits<{ select: [placeId: string] }>()
const atlas = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
let resizeObserver: ResizeObserver | undefined

const westStops = routeStops.filter((stop) => stop.kind === 'route')
const visitedSet = computed(() => new Set(props.visitedIds))

function position(coordinates: readonly [number, number]): { left: string; top: string } {
  const [longitude, latitude] = coordinates
  const left = 8 + ((longitude - 93) / 9.5) * 84
  const top = 92 - ((latitude - 36) / 5.1) * 80
  return { left: `${left}%`, top: `${top}%` }
}

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
  context.beginPath()
  westStops.forEach((stop, index) => {
    const style = position(stop.coordinates)
    const x = Number.parseFloat(style.left) / 100 * rect.width
    const y = Number.parseFloat(style.top) / 100 * rect.height
    if (index === 0) context.moveTo(x, y)
    else context.lineTo(x, y)
  })
  context.strokeStyle = '#d96d3b'
  context.lineWidth = 4
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.stroke()
}

watch(() => props.visitedIds, () => undefined, { deep: true })

onMounted(async () => {
  await nextTick()
  drawRoute()
  resizeObserver = new ResizeObserver(drawRoute)
  if (atlas.value) resizeObserver.observe(atlas.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div class="fallback-atlas">
    <section ref="atlas" class="atlas-map" aria-label="青甘环线地理示意图">
      <canvas ref="canvas" aria-hidden="true"></canvas>
      <div class="atlas-map__wash" aria-hidden="true"></div>
      <button
        v-for="place in places"
        :key="place.id"
        type="button"
        class="atlas-marker"
        :class="{ 'is-visited': visitedSet.has(place.id), 'is-highlight': place.category === '沿途彩蛋' }"
        :style="position(place.coordinates)"
        :aria-label="`查看${place.name}`"
        @click="emit('select', place.id)"
      >
        {{ place.routeOrder }}<span>{{ place.name }}</span>
      </button>
      <div class="atlas-map__legend"><MapPinned :size="18" /><span>路线示意，非导航地图</span></div>
    </section>

    <section class="atlas-route-list">
      <header><p class="eyebrow">ROUTE INDEX</p><h2>完整图文路线</h2></header>
      <article v-for="(stop, index) in westStops" :key="stop.id">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <button v-if="stop.placeId" type="button" @click="emit('select', stop.placeId)">
          <strong>{{ stop.name }}</strong><small>{{ stop.note }}</small>
        </button>
        <div v-else><strong>{{ stop.name }}</strong><small>{{ stop.note }}</small></div>
        <VisitedToggle v-if="stop.placeId && placeById.has(stop.placeId)" :place-id="stop.placeId" compact />
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
.atlas-map {
  position: relative;
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
.atlas-marker span { position: absolute; top: 35px; left: 50%; width: max-content; max-width: 100px; color: var(--ink); font-size: 0.64rem; font-weight: 700; transform: translateX(-50%); }
.atlas-marker.is-visited { background: var(--lake); }
.atlas-marker.is-highlight { border-radius: 9px; background: var(--sunset); }
.atlas-map__legend { position: absolute; z-index: 4; right: 14px; bottom: 14px; display: flex; align-items: center; gap: 6px; padding: 9px 12px; border-radius: 999px; color: var(--muted); background: rgb(247 240 229 / 86%); font-size: 0.7rem; }

.atlas-route-list { padding: 24px; border: 1px solid var(--line); border-radius: 28px; background: rgb(255 255 255 / 38%); }
.atlas-route-list h2 { margin-bottom: 20px; font-size: 2rem; }
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
  .atlas-map { position: sticky; top: 90px; min-height: 650px; }
  .atlas-route-list article { grid-template-columns: 38px minmax(0, 1fr) auto; }
  .atlas-route-list article :deep(.visited-toggle) { grid-column: auto; }
  .atlas-combinations { grid-column: 1 / -1; }
  .atlas-combinations > div { grid-template-columns: repeat(3, 1fr); }
}
</style>
