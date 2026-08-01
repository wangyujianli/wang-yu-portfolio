<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { loadAMap, type AMapInstance } from '@/lib/amap'
import type { JourneyRoute, Place } from '@/types/content'

const props = defineProps<{ visitedIds: string[]; route: JourneyRoute; places: Place[]; selectedId?: string | null }>()
const emit = defineEmits<{ ready: []; failed: [reason: string]; select: [placeId: string] }>()
const container = ref<HTMLElement>()
const markerElements = new Map<string, HTMLElement>()
let map: AMapInstance | undefined

function syncMarkerState(): void {
  const visited = new Set(props.visitedIds)
  markerElements.forEach((element, placeId) => element.classList.toggle('is-visited', visited.has(placeId)))
}

onMounted(async () => {
  if (!container.value) return
  try {
    const AMap = await loadAMap()
    if (!AMap.Polyline || !AMap.Marker || !AMap.Pixel) throw new Error('地图绘图组件没有完整加载')

    map = new AMap.Map(container.value, {
      center: [97.6, 38.1],
      zoom: 6.15,
      viewMode: '2D',
      resizeEnable: true,
      mapStyle: 'amap://styles/whitesmoke',
    })

    const overlays: unknown[] = []
    const flight = new AMap.Polyline({
      path: [[120.1551, 30.2741], [101.7782, 36.6171]],
      strokeColor: '#6f8f98',
      strokeWeight: 2,
      strokeStyle: 'dashed',
      strokeOpacity: 0.8,
    })
    const routePlaceById = new Map(props.places.map((place) => [place.id, place]))
    const allPlaceById = new Map((await import('@/data/places')).places.map((place) => [place.id, place]))
    const routeLine = new AMap.Polyline({
      path: props.route.placeIds.map((id) => allPlaceById.get(id)).filter((place): place is Place => Boolean(place)).map((place) => [...place.coordinates]),
      strokeColor: props.route.accent,
      strokeWeight: 5,
      strokeOpacity: 0.88,
      lineJoin: 'round',
      lineCap: 'round',
      showDir: true,
    })
    overlays.push(flight, routeLine)

    for (const [index, placeId] of props.route.placeIds.filter((id, index, ids) => ids.indexOf(id) === index).entries()) {
      const place = routePlaceById.get(placeId)
      if (!place) continue
      const element = document.createElement('button')
      element.type = 'button'
      element.className = `amap-route-marker${place.category === '沿途彩蛋' ? ' is-highlight' : ''}${props.selectedId === place.id ? ' is-selected' : ''}`
      element.textContent = String(index + 1)
      element.title = place.name
      markerElements.set(place.id, element)
      const marker = new AMap.Marker({
        position: [...place.coordinates],
        content: element,
        offset: new AMap.Pixel(-18, -18),
        zIndex: place.category === '沿途彩蛋' ? 130 : 120,
      })
      marker.on('click', () => emit('select', place.id))
      overlays.push(marker)
    }

    map.add(overlays)
    map.setFitView(overlays)
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
  <div ref="container" class="route-map" aria-label="青甘大环线真实地图"></div>
</template>

<style>
.route-map {
  width: 100%;
  height: 100%;
  min-height: 560px;
  background: #e9e3d8;
}

.amap-route-marker {
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
  cursor: pointer;
}

.amap-route-marker.is-visited { background: #2d7f7b; }
.amap-route-marker.is-highlight { border-radius: 10px; background: #d96d3b; transform: rotate(4deg); }
.amap-route-marker.is-selected { outline: 4px solid rgb(45 127 123 / 30%); transform: scale(1.14); }

@media (max-width: 719px) {
  .route-map { min-height: 480px; }
}
</style>
