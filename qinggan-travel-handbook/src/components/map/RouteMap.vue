<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { loadAMap, type AMapInstance } from '@/lib/amap'
import { routeLineStyles } from '@/data/placeClassifications'
import type { JourneyRoute, Place, RouteScope } from '@/types/content'

const props = defineProps<{ visitedIds: string[]; route: JourneyRoute; places: Place[]; selectedId?: string | null }>()
const emit = defineEmits<{ ready: []; failed: [reason: string]; select: [placeId: string] }>()
const container = ref<HTMLElement>()
const markerElements = new Map<string, HTMLElement>()
let map: AMapInstance | undefined

interface RouteSegment {
  scope: RouteScope
  path: number[][]
}

function routeSegments(route: JourneyRoute, placeById: Map<string, Place>): RouteSegment[] {
  const ordered = route.placeIds
    .map((id) => placeById.get(id))
    .filter((place): place is Place => Boolean(place?.classification.isStandalone))
  const segments: RouteSegment[] = []

  for (let index = 1; index < ordered.length; index += 1) {
    const previous = ordered[index - 1]!
    const current = ordered[index]!
    const scope = current.classification.routeScope
    const last = segments.at(-1)
    if (last?.scope === scope) last.path.push([...current.coordinates])
    else segments.push({ scope, path: [[...previous.coordinates], [...current.coordinates]] })
  }
  return segments
}

function syncMarkerState(): void {
  const visited = new Set(props.visitedIds)
  markerElements.forEach((element, placeId) => element.classList.toggle('is-visited', visited.has(placeId)))
}

onMounted(async () => {
  if (!container.value) return
  try {
    const AMap = await loadAMap()
    if (!AMap.Polyline || !AMap.Marker || !AMap.Pixel) throw new Error('地图绘图组件没有完整加载')
    const Polyline = AMap.Polyline

    map = new AMap.Map(container.value, {
      center: [97.6, 38.1],
      zoom: 6.15,
      viewMode: '2D',
      resizeEnable: true,
      mapStyle: 'amap://styles/whitesmoke',
    })

    const overlays: unknown[] = []
    const routeOverlays: unknown[] = []
    const flight = new Polyline({
      path: [[120.1551, 30.2741], [101.7782, 36.6171]],
      strokeColor: '#6f8f98',
      strokeWeight: 2,
      strokeStyle: 'dashed',
      strokeOpacity: 0.8,
    })
    const routePlaceById = new Map(props.places.filter((place) => place.classification.isStandalone).map((place) => [place.id, place]))
    const allPlaceById = new Map((await import('@/data/places')).places.map((place) => [place.id, place]))
    const routeLines = routeSegments(props.route, allPlaceById).map((segment) => {
      const lineStyle = routeLineStyles[segment.scope]
      return new Polyline({
        path: segment.path,
        strokeColor: segment.scope === 'main-route' ? props.route.accent : lineStyle.color,
        strokeWeight: segment.scope === 'main-route' ? 5 : 4,
        strokeOpacity: lineStyle.opacity,
        strokeStyle: lineStyle.strokeStyle,
        strokeDasharray: lineStyle.dash.length ? lineStyle.dash : undefined,
        lineJoin: 'round',
        lineCap: 'round',
        showDir: segment.scope === 'main-route',
        extData: { routeScope: segment.scope },
      })
    })
    overlays.push(flight, ...routeLines)
    routeOverlays.push(...routeLines)

    for (const [index, placeId] of props.route.placeIds.filter((id, index, ids) => ids.indexOf(id) === index).entries()) {
      const place = routePlaceById.get(placeId)
      if (!place) continue
      const [longitude] = place.coordinates
      const labelOnLeft = longitude > 101 || (longitude >= 97 && index % 2 === 1)
      const element = document.createElement('button')
      element.type = 'button'
      element.className = [
        'amap-route-marker',
        place.category === '沿途彩蛋' ? 'is-highlight' : '',
        props.selectedId === place.id ? 'is-selected' : '',
        labelOnLeft ? 'is-label-left' : '',
        index % 4 === 2 ? 'is-label-raised' : '',
        index % 4 === 3 ? 'is-label-lowered' : '',
      ].filter(Boolean).join(' ')
      element.setAttribute('aria-label', `查看${place.name}`)

      const pin = document.createElement('span')
      pin.className = 'amap-route-marker__pin'
      pin.textContent = String(index + 1)
      pin.setAttribute('aria-hidden', 'true')

      const label = document.createElement('span')
      label.className = 'amap-route-marker__label'
      label.textContent = place.name

      element.append(pin, label)
      element.title = place.name
      element.addEventListener('click', () => emit('select', place.id))
      markerElements.set(place.id, element)
      const marker = new AMap.Marker({
        position: [...place.coordinates],
        content: element,
        offset: new AMap.Pixel(-18, -18),
        zIndex: place.category === '沿途彩蛋' ? 130 : 120,
      })
      overlays.push(marker)
      routeOverlays.push(marker)
    }

    map.add(overlays)
    map.setFitView(routeOverlays, false, [64, 124, 64, 124], 7.8)
    syncMarkerState()
    emit('ready')
  } catch (error) {
    emit('failed', error instanceof Error ? error.message : '真实地图暂时没有连上')
  }
})

watch(() => props.visitedIds, syncMarkerState, { deep: true })

onBeforeUnmount(() => map?.destroy())
</script>

<template>
  <div ref="container" class="route-map" :data-route-scope="route.scope" aria-label="青甘大环线真实地图"></div>
</template>

<style>
.route-map {
  width: 100%;
  height: 100%;
  min-height: 560px;
  background: #e9e3d8;
}

.amap-route-marker {
  position: relative;
  display: block;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  color: #44362e;
  background: transparent;
  font-family: "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
  cursor: pointer;
  overflow: visible;
}

.amap-route-marker__pin {
  position: relative;
  z-index: 2;
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 3px solid #f7f0e5;
  border-radius: 50%;
  color: #fff;
  background: #5b514b;
  box-shadow: 0 6px 15px rgb(53 42 36 / 25%);
  font: 700 12px/1 system-ui, sans-serif;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.amap-route-marker__label {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 42px;
  min-width: max-content;
  max-width: 148px;
  padding: 4px 8px;
  border: 1px solid rgb(119 90 59 / 18%);
  border-radius: 999px;
  color: #3f332d;
  background: rgb(251 247 237 / 92%);
  box-shadow: 0 3px 9px rgb(53 42 36 / 12%);
  font-size: 12px;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: .01em;
  transform: translateY(-50%);
  pointer-events: none;
  white-space: nowrap;
}

.amap-route-marker.is-label-left .amap-route-marker__label {
  right: 42px;
  left: auto;
}

.amap-route-marker.is-label-raised .amap-route-marker__label {
  top: auto;
  bottom: 31px;
  transform: none;
}

.amap-route-marker.is-label-lowered .amap-route-marker__label {
  top: 31px;
  transform: none;
}

.amap-route-marker.is-visited .amap-route-marker__pin { background: #2d7f7b; }
.amap-route-marker.is-highlight .amap-route-marker__pin { border-radius: 10px; background: #d96d3b; transform: rotate(4deg); }
.amap-route-marker.is-selected .amap-route-marker__pin { outline: 4px solid rgb(45 127 123 / 30%); transform: scale(1.14); }
.amap-route-marker:hover .amap-route-marker__pin,
.amap-route-marker:focus-visible .amap-route-marker__pin { box-shadow: 0 8px 19px rgb(53 42 36 / 35%); transform: translateY(-2px); }
.amap-route-marker:focus-visible { outline: none; }

@media (max-width: 719px) {
  .route-map { min-height: 480px; }
  .amap-route-marker__label { max-width: 112px; padding: 3px 6px; font-size: 10px; }
}
</style>
